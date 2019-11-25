from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.db.utils import IntegrityError
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import odas_backend.settings as settings

@csrf_exempt
def register(request):
    usr = request.POST.get('username')
    psw = request.POST.get('pass')
    eml = request.POST.get('email')
    # With Postman add header, content-type: application/json -> form-data
    if usr and psw and eml:
        try:
            user = User.objects.create(username=usr, password=psw, email=eml)
            user.set_password(user.password)
            user.save()
            tkn = Token.objects.create(user=user)
            data = {
                'id': user.id,
                'username': user.username,
                'token': tkn.key,
                'data': True,
                'error': 'None'
            }
            return JsonResponse(data)
        except IntegrityError:
            return JsonResponse({ 'data': False, 'error': 'User with this username already exists' })
    else:
        return JsonResponse({
            'data': False, 
            'error': 'Details not provided' 
        })

@csrf_exempt
def register_org(request):
    if request.method == 'POST':
        org_name = request.POST.get('org_name')
        psw = request.POST.get('pass')
        
        if psw and psw == settings.CREATE_ORG_PASSWORD:
            if org_name:
                try:
                    Group.objects.create(name=org_name)

                    return JsonResponse( { 'data': True, 'error': 'None' } )
                except IntegrityError:
                    return JsonResponse( { 'data': False, 'error': 'Organization with this name already exists' } )
            else:
                return JsonResponse( { 'data': False, 'error': 'Must provide organization name' } )
        else:
            return JsonResponse( { 'data': False, 'error': 'Password not provided or incorrect' } )
    else:
        return JsonResponse( { 'data': False, 'error': 'Only POST methods allowed' } )

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

@csrf_exempt
def logout(request):
    try:
        usr = int(request.POST.get('uid'))
    except TypeError:
        return JsonResponse( { 'data': False, 'error': 'User ID not provided' } )
    if usr:
        try:
            user = User.objects.get(pk=usr)
            tkn = Token.objects.get(user=user)
            Token.objects.get(user=user).delete()
            data = {
                'id': user.id,
                'username': user.username,
                'token': tkn.key,
                'data': True,
                'error': 'None',
                'log': 'Successfully logged out'
            }
            return JsonResponse(data)
        except IntegrityError:
            return JsonResponse({ 'data': False, 'error': 'Login with this username already exists' })
        except Token.DoesNotExist:
            return JsonResponse({ 'data': False, 'error': 'Cant logout when no one is logged in' })
        except ValueError:
            return JsonResponse( { 'data': False, 'error': 'User ID not provided as number format' } )
    else:
        return JsonResponse({
            'data': False, 
            'error': 'Details not provided' 
        })