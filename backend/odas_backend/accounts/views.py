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

@csrf_exempt
def register(request):
    usr = request.POST.get('username')
    psw = request.POST.get('pass')
    eml = request.POST.get('email')
    inv = request.POST.get('code')
    # With Postman add header, content-type: application/json -> form-data
    if usr and psw and eml:
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
            return JsonResponse({ 'data': False, 'error': 'User with this username already exists' })
        except Invite.DoesNotExist:
            return JsonResponse( { 'data': False, 'error': 'Invitation Link is invalid' } )
    else:
        return JsonResponse({
            'data': False, 
            'error': 'Details not provided: Must provide username, pass, email; code (optional)' 
        })

@csrf_exempt
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def register_org(request):
    org_name = request.POST.get('org_name')
    psw = request.POST.get('pass')

    if not org_name:
        return JsonResponse( { 'data': False, 'error': 'Must provide organization name' } )

    if not psw or psw != settings.CREATE_ORG_PASSWORD:
        return JsonResponse( { 'data': False, 'error': 'Password not provided or incorrect' } )
    
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

        return JsonResponse( { 'data': True, 'invite_code': invite_code, 'error': 'None' } )
    except IntegrityError:
        return JsonResponse( { 'data': False, 'error': 'Organization with this name already exists' } )

@csrf_exempt
def login(request):
    usr = request.POST.get('username')
    psw = request.POST.get('pass')

    if usr and psw:
        try:
            user = authenticate(username=usr, password=psw)
            tkn = Token.objects.get_or_create(user=user)
            data = {
                'id': user.id,
                'username': user.username,
                'token': tkn[0].key,
                'data': True,
                'error': 'None'
            }
            return JsonResponse(data)
        except IntegrityError:
            return JsonResponse({ 'data': False, 'error': 'Username and/or password are not correct' })
    else:
        return JsonResponse({
            'data': False, 
            'error': 'Details not provided' 
        })

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):    
    request.auth.delete()
    return JsonResponse({ 'data': True, 'error': 'None' })