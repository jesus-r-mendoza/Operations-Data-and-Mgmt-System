def get_creds():
    creds = {}
    with open('../config.cfg', 'r') as cfg:
        for line in cfg:
            parts = line[:-1].split('=')
            creds[parts[0]] = parts[1]
    return creds