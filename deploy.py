try:
    import requests
except ImportError:
    print('\nERROR: You need to install the requests package first. \nDo: $ pip install requests\n')
    exit(1)

from backend.odas_backend.odas_backend.config import get_creds

creds = get_creds()

deploy_site = creds['dep_site']
token = creds['dep_token']

auth = {
    'Authorization': f"Token {token}"
}

res = requests.post(url=deploy_site, headers=auth)
print(res)