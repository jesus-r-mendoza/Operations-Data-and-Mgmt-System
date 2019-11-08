import requests
import os
import sys
email_site = 'http://localhost:8000/email/'
file_site = 'http://localhost:8000/files/upload/'
delete_site = 'http://localhost:8000/files/<int:pk>/'
x = {
    'your_email': 'richardbalbuena1337@gmail.com',
    'subject': 'testing with cors headers',
    'message': 'implemented cors headers for django'
}

res = requests.post(url=email_site, data=x)
print(res.text)

#with open(os.path.join(sys.path[0], 'sample.txt'), 'rb') as f:
    #xx={
        #'description': 'testing from cors',
        #'upfile': f


    #}


files = {'upfile' : open('sample.txt','rb')}
values = {'description': 'testing from cors'}
file_res = requests.post(url=file_site, files=files, data=values)
print(file_res.text)
