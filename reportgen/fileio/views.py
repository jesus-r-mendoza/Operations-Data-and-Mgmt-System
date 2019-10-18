from django.shortcuts import render
from django.core.files.storage import FileSystemStorage

# Create your views here.
def uploader(request):
    context = {}
    if request.method =='Post':
        file_uploaded = request.FILES['fileinput']
        fs = FileSystemStorage()
        fname= fs.save(file_uploaded.name, file_uploaded)
        context['url'] = fs.url(fname)
    return render(request,'fileio/uploader.html', context)