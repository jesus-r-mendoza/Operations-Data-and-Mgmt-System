from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse,Http404, FileResponse
from django.core.mail import send_mail, BadHeaderError
from django.core.files.storage import FileSystemStorage
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from odas.models import Satellite, Component, Measurement, Units
from .forms import SubscriberForm, UploadForm
from django.contrib.auth.models import User, Group
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .models import Upload
from .errors import error
import os

@csrf_exempt
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def index(request):
    if request.method == 'GET':
        form = SubscriberForm()
    else:
        all_sats = Satellite.objects.all()
        sat_name1= all_sats[0].name
        desc_1 = all_sats[0].mission_description
        
        concant_msg = sat_name1 + desc_1
        form = SubscriberForm(request.POST)
        if form.is_valid():
            subject = form.cleaned_data['subject']
            your_email = form.cleaned_data['your_email']
            message = concant_msg
            try:
                send_mail(subject, message, 'odasreport@gmail.com', [your_email])
            except BadHeaderError:
                return HttpResponse('Invalid header found.')
            return redirect('success')
    return render(request, 'emailsender/index.html', {'form': form})

def successView(request):
    return HttpResponse('Thank you, your email was sent.')

def dbemail(request):
    all_sats = Satellite.objects.all()
    return render(request, 'emailsender/db_test.html', {
        'all_sats': all_sats
    })
  
def dbwritefile(request):
    all_sats = Satellite.objects.all()
    sat_name1= all_sats[0].name
    desc_1 = all_sats[0].mission_description
    concant_msg = sat_name1 + desc_1
    cpath = os.path.join(settings.MEDIA_ROOT,'files','uploads', 'new.txt')       

    file1 = open(cpath, "w")

    toFile = concant_msg

    file1.write(toFile)

    file1.close()
    return HttpResponse('File was saved to your files.')

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

@csrf_exempt
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def upload_view(request):
    if request.method == 'POST':        
        upfile = request.FILES.get('upfile')
        desc = request.POST.get('description')
        
        if upfile and desc:
            Upload.objects.create(upfile=upfile, description=desc, user = request.user)
        else:
            return JsonResponse( { 'data': False, 'error': 'Must provide both: upfile and description' } )

        return JsonResponse( { 'data': True, 'error': 'None' } )
    else:
        return JsonResponse( { 'data': False, 'error': 'only POST requests allowed' } )

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_file(request, pk):
    if request.method == 'POST':
        user_file = Upload.objects.get(pk=pk)
        user_file.delete()
    return redirect('file_list')

# @api_view(['GET'])
# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
# def download_view(request, url):
#     try:
#         response = FileResponse(open(url, 'rb'))
#         response['content_type'] = "application/octet-stream"
#         response['Content-Disposition'] = 'attachment; filename=' + os.path.basename(url)
#         return response
#     except Exception:
#         raise Http404

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def download_view(request, url):
    try:
        fUpload = Upload.objects.get(pk=fid)
        if not request.user.filter(name=fUpload.User.name).exists():
            return error.USER_DNE
        response = FileResponse(open(url, 'rb'))
        response['content_type'] = "application/octet-stream"
        response['Content-Disposition'] = 'attachment; filename=' + os.path.basename(url)
        return response
    except Exception:
        raise Http404
