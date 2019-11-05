class ManyIdConverter:
    regex = '[\d+]+'
    
    def to_python(self, value):
        res = [ int(id) for id in value.split('+') ]
        return res

    def to_url(self, value):
        res = '+'.join(value)
        return res