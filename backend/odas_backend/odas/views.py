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

def _build_response(meas_query_set):
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
        entry = {
            'component_name': measurement.component.name,
            'component_model': measurement.component.model,
            'component_category': measurement.component.category,
            'component_description': measurement.component.description,
            'units': measurement.units.units,
            'time': measurement.time_measured,
            'value': measurement.value
        }
        data['Measurements'].append(entry)
    data['Quantity'] = len(data['Measurements'])
    data['data'] = True
    data['error'] = 'None'
    return data

def recent_by_component(request, satellite_id, component_id, quantity):
    pass