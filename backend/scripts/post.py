import requests
email_site = 'http://localhost:8000/email/'
file_site = 'http://localhost:8000/files/upload/'
x = {
    'your_email': 'richardbalbuena1337@gmail.com',
    'subject': 'testing with cors headers',
    'message': 'implemented cors headers for django'
}

res = requests.post(url=email_site, data=x)
print(res.text)

with open('sample.txt', 'rb') as f:
    x={
        'description': 'testing from cors',
        'upfile': f


}
    file_res = requests.post(url=file_site, data=x)
    print(file_res.text)

