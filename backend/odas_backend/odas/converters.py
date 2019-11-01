class ManyIdConverter:
    regex = r'^(\d{1,}\+{0,1})*\d+$'

    def to_python(self, value):
        return [ int(id) for id in value.split('+') ]

    def to_url(self, value):
        return '+'.join(value)