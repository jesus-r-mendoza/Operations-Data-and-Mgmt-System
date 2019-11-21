import requests
import os
import sys
email_site = 'http://localhost:8000/email/'
file_site = 'http://localhost:8000/files/upload/'
delete_site = 'http://localhost:8000/files/<int:pk>/'
register_site = 'http://localhost:8000/register/'
login_site = 'http://localhost:8000/login/'
logout_site = 'http://localhost:8000/logout/'

# x = {
#     'your_email': 'richardbalbuena1337@gmail.com',
#     'subject': 'testing with cors headers',
#     'message': 'implemented cors headers for django'
# }

x = {
    'username': 'joe1',
    'pass': 'test'
    # 'email': 'j@t.com'
}

# x = { 'uid': 6 }

res = requests.post(url=login_site, data=x)
print(res.text)

#with open(os.path.join(sys.path[0], 'sample.txt'), 'rb') as f:
    #xx={
        #'description': 'testing from cors',
        #'upfile': f


    #}


# files = {'upfile' : open('sample.txt','rb')}
# values = {'description': 'testing from cors'}
# file_res = requests.post(url=file_site, files=files, data=values)
# print(file_res.text)
