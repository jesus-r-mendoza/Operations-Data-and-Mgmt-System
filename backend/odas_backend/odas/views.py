from django.shortcuts import render,redirect
from django.http import HttpResponse, JsonResponse
from django.core.mail import send_mail,BadHeaderError
from django.core.files.storage import FileSystemStorage
from .forms import SubscriberForm, UploadForm
from .models import Upload, Satellite, Component, Measurement, Units
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def index(request):
    if request.method == 'GET':
        form = SubscriberForm()
    else:
        form = SubscriberForm(request.POST)
        if form.is_valid():
            subject = form.cleaned_data['subject']
            your_email = form.cleaned_data['your_email']
            message = form.cleaned_data['message']
            try:
                send_mail(subject, message, 'odasreport@gmail.com', [your_email])
            except BadHeaderError:
                return HttpResponse('Invalid header found.')
            return redirect('success')
    return render(request, 'emailsender/index.html', {'form': form})

def successView(request):
    return HttpResponse('Thank you. You are now subscribed to emails')

# Create your views here.
@csrf_exempt
def uploader(request):
    context = {}
    if request.method =='POST':
        file_uploaded = request.FILES['fileinput']
        fs = FileSystemStorage()
        fname= fs.save(file_uploaded.name, file_uploaded)
        context['url'] = fs.url(fname)
    return render(request,'fileio/uploader.html', context)

def file_view(request):
    files = Upload.objects.all()
    return render(request, 'fileio/file_list.html', {
        'files': files
    })

def upload_view(request):
    if request.method == 'POST':
        form = UploadForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('file_list')
    else:
        form = UploadForm()
    return render(request, 'fileio/upload_file.html', {
        'form': form
    })

def components_of_satellite(request, satellite_id):
    try:
        sat = Satellite.objects.get(pk=satellite_id)
        components = Component.objects.filter(satellite=sat)
        data = _build_comp_response(components)
        return JsonResponse(data)
    except Satellite.DoesNotExist:
        return JsonResponse( { 'data': False, 'error': 'Satellite Does Not Exist'} )

def comp_measu_from_to(request, satellite_id, from_date, to_date, component_id=None):
    try:
        if from_date[0] != 'from' or to_date[0] != 'to':
            return JsonResponse( { 'data': False, 'error': 'Must specify both [from] and [to] date-times' } )
        sat = Satellite.objects.get(pk=satellite_id)
        measurements = Measurement.objects.filter(time_measured__gte=from_date[1]).filter(time_measured__lte=to_date[1])
        if component_id == None:
            comp = None
        else:
            comp = Component.objects.get(pk=component_id)
            measurements = measurements.filter(component = comp)

        qs = [sat, (comp, len(measurements), measurements)]
        if comp == None:
            data = _build_response(qs)
        else:
            data = _build_response(qs, add_component=False)
        return JsonResponse(data)

    except Satellite.DoesNotExist:
        return JsonResponse( { 'data': False, 'error': 'Satellite Does Not Exist'} )

def recent_measurements(request, satellite_id, quantity):
    try:
        sat = Satellite.objects.get(pk=satellite_id)
        if quantity < 1:
            return JsonResponse( { 'data': False, 'error': 'Must request at least 1 recent measurement'} )
        # Take the specified amount of the  most recent measurements for the given satellite
        measurements = Measurement.objects.filter(satellite=sat).order_by('-time_measured')[:quantity]
        qs = [sat, (None, len(measurements), measurements)]
        data = _build_response(qs)
        return JsonResponse(data)
    except Satellite.DoesNotExist:
        return JsonResponse( { 'data': False, 'error': 'Satellite Does Not Exist'} )

def recent_by_component(request, satellite_id, component_id, quantity):
    try:
        sat = Satellite.objects.get(pk=satellite_id)
        comp = Component.objects.get(pk=component_id)

        if quantity < 1:
            return JsonResponse( { 'data': False, 'error': 'Must request at least 1 recent measurement'} )
        # Take the specified amount of the  most recent measurements for the given satellite
        measurements = Measurement.objects.filter(satellite=sat).filter(component=comp).order_by('-time_measured')[:quantity]
        qs = [sat, (comp, len(measurements), measurements)]
        data = _build_response(qs, add_component=False)
        return JsonResponse(data)

    except Satellite.DoesNotExist:
        return JsonResponse( { 'data': False, 'error': 'Satellite Does Not Exist'} )
    except Component.DoesNotExist:
        return JsonResponse( { 'data': False, 'error': 'Component Does Not Exist'} )

def recent_by_many_components(request, satellite_id, component_ids, quantity):
    try:
        sat = Satellite.objects.get(pk=satellite_id)
        measurements = Measurement.objects.filter(satellite=sat)
        querys = [sat] # list will be in this format: [sat, (comp, size, qs), (comp, size, qs), ...]
        if quantity < 1:
            return JsonResponse( { 'data': False, 'error': 'Must request at least 1 recent measurement'} )
        comp_not_exist = []
        for id in component_ids:
            try:
                comp = Component.objects.get(pk=id)
                meas = measurements.filter(component=comp).order_by('-time_measured')[:quantity]
                querys.append( (comp, len(meas), meas) )
            except Component.DoesNotExist:
                # add to list of comps not exists
                comp_not_exist.append( { id: f'Component of this ID does not exist on {sat.name}'} )
        
        if len(comp_not_exist) == len(component_ids):
            return JsonResponse( { 'data': False, 'error': 'Component(s) Does not exist' } )

        data = _build_response( querys )
        
        if len(comp_not_exist) > 0:
            data['Quantities'] += comp_not_exist

        return JsonResponse(data)

    except Satellite.DoesNotExist:
        return JsonResponse( { 'data': False, 'error': 'Satellite Does Not Exist'} )

def _build_response(query_set_list, add_component=True):
    # query_set_list[0] contains Satellite obj
    if not len(query_set_list) > 1 or query_set_list[1][1] == 0:
        return { 'data': False, 'error': 'Satellite has no measurements fitting those parameters' }
    data = {
        'Satellite': {
            'name': query_set_list[0].name,
            'mission_description': query_set_list[0].mission_description,
            'year_launched': query_set_list[0].year_launched 
        },
        'Measurements': []
    }
    quantities = []
    for (comp, quant, qs) in query_set_list[1:]:
        if comp == None:
            reassign_comp = True
        else:
            reassign_comp = False
        for measurement in qs:
            entry = {}
            if add_component:
                if reassign_comp:
                    comp = measurement.component
                entry['component_name'] = comp.name,
                entry['component_model'] = comp.model,
                entry['component_category'] = comp.category,
                entry['component_description'] = comp.description,
                    
            entry['units'] = measurement.units.units
            entry['time']  = measurement.time_measured
            entry['value'] = measurement.value

            data['Measurements'].append(entry)
        
        quantities.append( { comp.name: quant } )

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