from flask import Flask, request
import os

app = Flask(__name__)

@app.route('/deploy', methods=['POST'])
def deploy():
    try:
        os.chdir('/home/superman/Operations-Data-and-Mgmt-System')
    except FileNotFoundError:
        return 'Could not locate ODAS repository on server', 500

    text, code = _check_auth()
    if code != 200:
        return text, code

    cmds = [
        ( 'git pull', 'Failed update repo from github' )
    ]
    for cmd in cmds:
        rc = _execute(*cmd, text)
        if rc:
            return rc

    return 'Successfully deployed. Changes should occur shortly', 200

@app.route('/launch', methods=['POST'])
def launch():
    pass

def _check_auth():
    try:
        with open('deployer/auth.cfg', 'r') as auth:
            key = auth.read()
    except FileNotFoundError:
        return 'Authorization config file not found on server', 500
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

    return ignore_stdout, 200

def _execute(cmd, error_msg, ignore):
    rc = os.system(f'{cmd} {ignore}')
    if rc != 0:
        return error_msg, 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)