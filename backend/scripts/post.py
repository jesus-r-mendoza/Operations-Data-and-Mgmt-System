import requests
email_site = 'http://localhost:8000/email/'
file_site = 'http://localhost:8000/files/upload/'
x = {
    'your_email': '',
    'subject': 'testing with cors headers',
    'message': 'implemented cors headers for django'
}

res = requests.post(url=email_site, data=x)
print(res.text)

# with open('sample.txt', 'rb') as f:
#     file_res = requests.post(url=file_site, data={'fileinput': f})
#     print(file_res.text)