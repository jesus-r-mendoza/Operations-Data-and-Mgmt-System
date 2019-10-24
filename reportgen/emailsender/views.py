from django.shortcuts import render
from django.http import HttpResponse
from django.core.mail import send_mail

def index(request):

    send_mail('Testing the  send email feature from DJANGO',
    'testing from the django #2',
    'odasreport@gmail.com',
    ['richardbalbuena1337@gmail.com'],
    fail_silently = False)
    return render(request,'emailsender/index.html')