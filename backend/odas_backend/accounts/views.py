from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.db.utils import IntegrityError
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def register(request):
    usr = request.POST.get('username')
    psw = request.POST.get('pass')
    eml = request.POST.get('email')

    if usr and psw and eml:
        try:
            user = User.objects.create(username=usr, password=psw, email=eml)
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
            'usr': usr,
            'psw': psw,
            'eml': eml,
            'data': False, 
            'error': 'Details not provided' 
        })

@csrf_exempt
def logout(request):
    usr = int(request.POST.get('uid'))

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
    else:
        return JsonResponse({
            'usr': usr,
            'psw': psw,
            'data': False, 
            'error': 'Details not provided' 
        })