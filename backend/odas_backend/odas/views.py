from django.shortcuts import render,redirect
from django.http import HttpResponse, JsonResponse
from django.core.mail import send_mail,BadHeaderError
from django.core.files.storage import FileSystemStorage
from .forms import SubscriberForm, UploadForm
from .models import Upload, Satellite, Component, Measurement, Units
from django.views.decorators.csrf import csrf_exempt
import os
import json

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

# create myView

def files_and_sizes(start_path):
    dir_list = [file for file in os.listdir(start_path)]
    current_dir = []
    for file in dir_list:
        path = start_path + "\\" + file
        if os.path.isdir(path) is True:
            current_dir.append(files_and_sizes(path))
        else:
            current_dir.append((file, os.lstat(path).st_size))
    return current_dir
	
	
def filesize(request):	
	x=dict(files_and_sizes('c:/users/albertc/desktop/odasrepo/Operations-Data-and-Mgmt-System/backend/odas_backend/media/files/uploads'))
	for i in x:
		y=str(x.get(i)) + " byte"
		x[i]=y
	data=dict()
	data["files"]=x
	data["data"]=True
	data["error"]="None."
	return JsonResponse(data)



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

def recent_measurements(request, satellite_id, quantity):
    try:
        if satellite_id < 0:
            print('id < 0', satellite_id)
            return JsonResponse( { 'data': False, 'error': 'Must request at valid satellite id'} )

        sat = Satellite.objects.get(pk=satellite_id)
        if quantity < 1:
            return JsonResponse( { 'data': False, 'error': 'Must request at least 1 recent measurement'} )
        # Take the specified amount of the  most recent measurements for the given satellite
        measurements = Measurement.objects.filter(satellite=sat).order_by('-time_measured')[:quantity]
        data = _build_response(measurements)
        return JsonResponse(data)
    except Satellite.DoesNotExist:
        return JsonResponse( { 'data': False, 'error': 'Satellite Does Not Exist'} )

def recent_by_component(request, satellite_id, component_id, quantity):
    try:
        if satellite_id < 0:
            print('id < 0', satellite_id)
            return JsonResponse( { 'data': False, 'error': 'Must request at valid satellite id'} )
        if component_id < 0:
            print('id < 0', component_id)
            return JsonResponse( { 'data': False, 'error': 'Must request at valid component id'} )

        sat = Satellite.objects.get(pk=satellite_id)
        comp = Component.objects.get(pk=component_id)

        if quantity < 1:
            return JsonResponse( { 'data': False, 'error': 'Must request at least 1 recent measurement'} )
        # Take the specified amount of the  most recent measurements for the given satellite
        measurements = Measurement.objects.filter(satellite=sat).filter(component=comp).order_by('-time_measured')[:quantity]
        data = _build_response(measurements, component=True)
        return JsonResponse(data)

    except Satellite.DoesNotExist:
        return JsonResponse( { 'data': False, 'error': 'Satellite Does Not Exist'} )
    except Component.DoesNotExist:
        return JsonResponse( { 'data': False, 'error': 'Component Does Not Exist'} )

def _build_response(meas_query_set, component=False):
    if not meas_query_set:
        return { 'data': False, 'error': 'Satellite has no recent measurements' }
    data = {
        'Satellite': {
            'name': meas_query_set[0].satellite.name,
            'mission_description': meas_query_set[0].satellite.mission_description,
            'year_launched': meas_query_set[0].satellite.year_launched 
        },
        'Measurements': []
    }
    for measurement in meas_query_set:
        entry = {}
        if not component:            
            entry['component_name'] = measurement.component.name,
            entry['component_model'] = measurement.component.model,
            entry['component_category'] = measurement.component.category,
            entry['component_description'] = measurement.component.description,
                
        entry['units'] = measurement.units.units
        entry['time']  = measurement.time_measured
        entry['value'] = measurement.value

        data['Measurements'].append(entry)

    data['Quantity'] = len(data['Measurements'])
    data['data'] = True
    data['error'] = 'None'
    return data