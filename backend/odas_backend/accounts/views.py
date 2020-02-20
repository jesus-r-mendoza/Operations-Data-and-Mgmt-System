from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.db.utils import IntegrityError
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Invite
import odas_backend.settings as settings
from django.utils.crypto import get_random_string
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from odas.errors import error
import os

@csrf_exempt
@api_view(['POST'])
def register(request):
    usr = request.POST.get('username')
    psw = request.POST.get('pass')
    eml = request.POST.get('email')
    inv = request.POST.get('code')

    if not usr or not psw or not eml:
        return error.MISSING_CREDENTIALS
    try:
        user = User.objects.create(username=usr, password=psw, email=eml)
        user.set_password(user.password)
        if inv:
            invite = Invite.objects.get(link=inv)
            user.groups.add(invite.organization)
        user.save()
        tkn = Token.objects.create(user=user)
        data = {
            'id': user.id,
            'username': user.username,
            'token': tkn.key,
            'data': True,
            'error': 'None'
        }
        if inv:
            data['organization'] = user.groups.all()[0].name
        return JsonResponse(data)
    except IntegrityError:
        return error.USERNAME_EXISTS
    except Invite.DoesNotExist:
        return error.INVITE_CODE_INVALID

@csrf_exempt
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def register_org(request):
    org_name = request.POST.get('org_name')
    psw = request.POST.get('pass')

    if not org_name:
        return error.ORG_NAME_REQUIRED

    if not psw or psw != settings.CREATE_ORG_PASSWORD:
        return error.PASSWORD_INVALID

    try:
        org = Group.objects.create(name=org_name)
        request.user.groups.add(org)
        unique = False
        while not unique:
            invite_code = get_random_string()
            try:
                Invite.objects.create(organization=org, link=invite_code)
                unique = True
            except IntegrityError:
                unique = False

        return JsonResponse( { 'data': True, 'organization': org.name, 'code': invite_code, 'error': 'None' } )
    except IntegrityError:
        return error.ORG_NAME_EXISTS

@csrf_exempt
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def join_org(request):
    if len(request.user.groups.all()) > 0:
        return error.ALREADY_IN_ORG
    try:
        inv = request.POST.get('code')
        if inv:
            invite = Invite.objects.get(link=inv)
            request.user.groups.add(invite.organization)
            request.user.save()
        else:
            return error.MISSING_INVITE_CODE
    except Invite.DoesNotExist:
        return error.INVITE_CODE_INVALID
    data = {
        'data': True,
        'organization': invite.organization.name,
        'code': invite.link,
        'error': 'None'
    }
    return JsonResponse(data)

@csrf_exempt
@api_view(['POST'])
def login(request):
    usr = request.POST.get('username')
    psw = request.POST.get('pass')

    if not usr or not psw:
        return error.USR_AND_PASS_REQUIRED

    user = authenticate(username=usr, password=psw)

    if not user:
        return error.USR_OR_PASS_INVALID

    tkn = Token.objects.get_or_create(user=user)
    data = {
        'id': user.id,
        'username': user.username,
        'token': tkn[0].key,
        'data': True,
        'error': 'None'
    }
    if len(user.groups.all()) > 0:
        data['organization'] = user.groups.all()[0].name
        invite = Invite.objects.filter(organization=user.groups.all()[0])[0] # The first result of the queryset is the Invite object
        data['code'] = invite.link
    else:
        data['organization'] = 'None'
        data['code'] = 'None'
    return JsonResponse(data)

@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    request.auth.delete()
    return JsonResponse({ 'data': True, 'error': 'None' })

@csrf_exempt
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def deploy(request):
    # This will be executed on the remote linux server
    os.chdir(f'{settings.BASE_DIR[:-12]}scripts')
    os.system('./deploy.sh')
    return JsonResponse( {'data': True} )