from django.shortcuts import render,redirect
from django.http import HttpResponse, JsonResponse
from django.core.mail import send_mail,BadHeaderError
from django.core.files.storage import FileSystemStorage
from .forms import SubscriberForm, UploadForm
from .models import Upload, Satellite, Component, Measurement, Units


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

def recent_measurements(request, sat_id):
    try:
        sat = Satellite.objects.get(pk=sat_id)
        # Take the 100 most recent measurements for the given satellite
        measurements = Measurements.objects.filter(satellite=sat).order_by('-time_measured')[:100]
        data = _build_response(measurements)
        print(data)
        return JsonResponse(data)
    except Satellite.DoesNotExits:
        return JsonResponse( {'data': False} )

def _build_response(meas_query_set):
    data = {
        'Satellite': {
            'name': measurement.satellite.name,
            'mission_description': measurement.satellite.mission_description,
            'year_launched': measurement.satellite.year_launched 
        },
        'Measurements': []
    }
    for measurement in meas_query_set:
        entry = {
            'Component': {
                'name': measurement.component.name,
                'model': measurement.component.model,
                'category': measurement.component.category,
                'description': measurement.component.description
            },
            'Measurement': {
                'units': measurement.units.units,
                'time': measurement.time_measured,
                'value': measurement.value
            }
        }
        data['Measurements'].append(entry)
        return data