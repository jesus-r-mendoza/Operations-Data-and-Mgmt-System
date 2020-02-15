from flask import Flask, request
import os


app = Flask(__name__)

@app.route('/deploy', methods=['POST'])
def deploy():

    with open('auth.cfg', 'r') as auth:
        key = auth.read()

    token = request.headers.get('Authorization')

    if not token:
        return 'You are not authorized to use this endpoint', 401

    if token != key:
        return 'Invalid Token', 403

    if os.name == 'nt':
        # windows
        ignore_stdout = '> nul 2>&1'
    else:
        # posix or java
        ignore_stdout = '> /dev/null'

    rc = os.system(f'cd ~/Operations-Data-and-Mgmt-System {ignore_stdout}')
    if rc != 0:
        return 'Failed to change directory', 500

    rc = os.system(f'git pull {ignore_stdout}')
    if rc != 0:
        return 'Failed update repo from github', 500

    return 'Successfully deployed. Changes should occur shortly', 200
