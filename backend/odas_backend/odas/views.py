from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Satellite, Component, Measurement, Units
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.contrib.auth.models import User, Group
from rest_framework import status
from rest_framework.response import Response
from .errors import error

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def satellites(request):
    org = request.user.groups.all()
    if len(org) == 0:
        return error.USR_NOT_IN_ORG
    org = org[0] # Users only allowed to be in one organization; so queryset only contains one value
    sat_queryset = Satellite.objects.filter(organization=org)
    sats = [ { 'id': sat.id, 'name': sat.name } for sat in sat_queryset ]
    if not sats:
        return error.ORG_HAS_NO_SATS
    data = {
        'satellites': sats,
        'data': True,
        'error': 'None'
    }
    return JsonResponse(data)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def components_of_satellite(request, satellite_id):
    try:
        sat = Satellite.objects.get(pk=satellite_id)
        if not request.user.groups.filter(name=sat.organization.name).exists():
            return error.SAT_PERM_DEN
        components = Component.objects.filter(satellite=sat)
        data = _build_comp_response(components)
        return JsonResponse(data)
    except Satellite.DoesNotExist:
        return error.SAT_DNE
    except Group.DoesNotExist:
        return error.SAT_NOT_OF_ORG

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def comp_measu_from_to(request, satellite_id, from_date, to_date, component_id=None):
    try:
        if from_date[0] != 'from' or to_date[0] != 'to':
            return error.DATE_RANGE_INVALID
        sat = Satellite.objects.get(pk=satellite_id)
        if not request.user.groups.filter(name=sat.organization.name).exists():
            return error.SAT_PERM_DEN
        measurements = Measurement.objects.filter(satellite=sat).filter(time_measured__gte=from_date[1]).filter(time_measured__lte=to_date[1])
        if component_id == None:
            comp = None
        else:
            comp = Component.objects.get(pk=component_id)
            if comp.satellite != sat:
                raise Component.DoesNotExist()
            measurements = measurements.filter(component = comp)

        qs = [sat, (comp, len(measurements), measurements)]
        if comp == None:
            data = _build_response(qs)
        else:
            data = _build_response(qs, add_component=False)
        return JsonResponse(data)

    except Satellite.DoesNotExist:
        return error.SAT_DNE
    except Component.DoesNotExist:
        return error.COMP_DNE_OR_PERM_DEN
    except Group.DoesNotExist:
        return error.SAT_NOT_OF_ORG

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def recent_measurements(request, satellite_id, quantity):
    try:
        sat = Satellite.objects.get(pk=satellite_id)
        if not request.user.groups.filter(name=sat.organization.name).exists():
            return error.SAT_PERM_DEN
        if quantity < 1:
            return error.QUANT_LESS_THAN_1
        # Take the specified amount of the  most recent measurements for the given satellite
        measurements = Measurement.objects.filter(satellite=sat).order_by('-time_measured')[:quantity]
        qs = [sat, (None, len(measurements), measurements)]
        data = _build_response(qs)
        return JsonResponse(data)
    except Satellite.DoesNotExist:
        return error.SAT_DNE
    except Group.DoesNotExist:
        return error.SAT_NOT_OF_ORG

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def recent_by_component(request, satellite_id, component_id, quantity):
    try:
        sat = Satellite.objects.get(pk=satellite_id)
        if not request.user.groups.filter(name=sat.organization.name).exists():
            return error.SAT_PERM_DEN
        comp = Component.objects.get(pk=component_id)
        if comp.satellite != sat:
            raise Component.DoesNotExist()
        if quantity < 1:
            return error.QUANT_LESS_THAN_1
        # Take the specified amount of the  most recent measurements for the given satellite
        measurements = Measurement.objects.filter(satellite=sat).filter(component=comp).order_by('-time_measured')[:quantity]
        qs = [sat, (comp, len(measurements), measurements)]
        data = _build_response(qs, add_component=False)
        return JsonResponse(data)

    except Satellite.DoesNotExist:
        return error.SAT_DNE
    except Component.DoesNotExist:
        return error.COMP_DNE_OR_PERM_DEN
    except Group.DoesNotExist:
        return error.SAT_NOT_OF_ORG

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def with_many_components(request, satellite_id, component_ids, quantity=None, from_date=None, to_date=None):
    try:
        sat = Satellite.objects.get(pk=satellite_id)
        if not request.user.groups.filter(name=sat.organization.name).exists():
            return error.SAT_PERM_DEN
        measurements = Measurement.objects.filter(satellite=sat)

        ans = _handle_many_comp_ids(component_ids, sat, measurements, quantity=quantity, from_date=from_date, to_date=to_date)
        if not ans:
            return error.QUANT_LESS_THAN_1
        else:
            querys, comp_not_exist = ans
        if len(comp_not_exist) == len(component_ids):
            return error.COMPS_DNE

        data = _build_response( querys )

        if len(comp_not_exist) > 0:
            data['Quantities']['DNE'] = comp_not_exist

        return JsonResponse(data)

    except Satellite.DoesNotExist:
        return error.SAT_DNE
    except Group.DoesNotExist:
        return error.SAT_NOT_OF_ORG

def _handle_many_comp_ids(comp_ids, sat, filtered_meas, quantity=None, from_date=None, to_date=None):
    querys = [sat] # list will be in this format: [sat, (comp, size, qs), (comp, size, qs), ...]
    comp_not_exist = []
    if quantity != None and quantity < 1:
        return None
    for id in comp_ids:
        try:
            comp = Component.objects.get(pk=id)
            if comp.satellite != sat:
                raise Component.DoesNotExist()
            if quantity:
                meas = filtered_meas.filter(component=comp).order_by('-time_measured')[:quantity]
            elif from_date and to_date:
                meas = filtered_meas.filter(component=comp).filter(time_measured__gte=from_date[1]).filter(time_measured__lte=to_date[1])
            querys.append( (comp, len(meas), meas) )
        except Component.DoesNotExist:
            # add to list of comps not exists
            comp_not_exist.append(id)
    return ( querys, comp_not_exist )

def _build_response(query_set_list, add_component=True):
    # query_set_list[0] contains Satellite obj
    if not len(query_set_list) > 1:
        return { 'data': False, 'error': 'Satellite has no measurements fitting those parameters' }
    data = {
        'Satellite': {
            'name': query_set_list[0].name,
            'mission_description': query_set_list[0].mission_description,
            'year_launched': query_set_list[0].year_launched
        }
    }
    if not add_component:
        comp = query_set_list[1][0]
        data['Component'] = {
            'name': comp.name,
            'model': comp.model,
            'category': comp.category,
            'description': comp.description
        }

    data['Measurements'] = []

    quantities = {}
    for (comp, quant, qs) in query_set_list[1:]:
        if comp == None:
            reassign_comp = True
        else:
            reassign_comp = False
            quantities[comp.name] = quant
        for measurement in qs:
            entry = {}
            if add_component:
                if reassign_comp:
                    comp = measurement.component
                    if quantities.get(comp.name):
                        quantities[comp.name] += 1
                    else:
                        quantities[comp.name] = 1

                entry['component_name'] = comp.name,
                entry['component_model'] = comp.model,
                entry['component_category'] = comp.category,
                entry['component_description'] = comp.description,

            entry['units'] = measurement.units.units
            entry['time']  = measurement.time_measured
            entry['value'] = measurement.value

            data['Measurements'].append(entry)

    data['Quantities'] = quantities
    data['comp_specified'] = add_component
    data['data'] = True
    data['error'] = 'None'
    return data

def _build_comp_response(comp_query_set):
    if not comp_query_set:
        return { 'data': False, 'error': 'Satellite has no components' }
    data = {
        'Satellite': {
            'name': comp_query_set[0].satellite.name,
            'mission_description': comp_query_set[0].satellite.mission_description,
            'year_launched': comp_query_set[0].satellite.year_launched
        },
        'Components': []
    }
    for comp in comp_query_set:
        entry = {
            'id': comp.id,
            'name': comp.name,
            'model': comp.model,
            'category': comp.category,
            'description': comp.description
        }

        data['Components'].append(entry)

    data['Quantities'] = len(data['Components'])
    data['data'] = True
    data['error'] = 'None'
    return data

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def insert_file_data(request, satellite_id, file_id, units):
    pass

def _process_file(filefield):
    try:
        with filefield.upfile.open() as csv:
            lines = csv.readlines()

        print(*lines, sep='\n')

    except FileNotFoundError:
        return False
