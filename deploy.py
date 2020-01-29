try:
    import requests
except ImportError:
    print('\nERROR: You need to install the requests package first. \nDo: $ pip install requests\n')
    exit(1)

from odas_backend.odas_backend.config import get_creds

deploy_site = 'http://localhost:8000/deploy/'
auth = {
    'Authorization': f"Token {get_creds()['dep_token']}"
}
res = requests.post(url=deploy_site, headers=auth)
print(res.text)