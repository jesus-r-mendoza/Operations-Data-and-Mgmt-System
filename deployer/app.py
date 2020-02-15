from flask import Flask, request
import os

app = Flask(__name__)

@app.route('/deploy', methods=['POST'])
def deploy():

    text, code = _check_auth()
    if code != 200:
        return text, code

    os.chdir('~/Operations-Data-and-Mgmt-System')
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

    return ignore_stdout, 200

def _execute(cmd, error_msg, ignore):
    rc = os.system(f'{cmd} ')
    if rc != 0:
        return error_msg, 500