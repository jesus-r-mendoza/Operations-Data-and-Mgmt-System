from datetime import datetime

class ManyIdConverter:
    regex = '[\d+]+'
    
    def to_python(self, value):
        res = { int(id) for id in value.split('+') }
        return res

    def to_url(self, value):
        strs = { f'{i}' for i in value }
        res = '+'.join(strs)
        return res

class DateTimeConverter:
    regex = '(from|to)=(now|\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})'

    def to_python(self, value):
        term, date_time = value.split('=')
        if date_time == 'now':
            return ( term, datetime.now() )

        date, time = date_time.split('T')
        year, mont, day = date.split('-')
        hour, minu, sec = time.split(':')

        dt = datetime(int(year), int(mont), int(day), int(hour), int(minu), int(sec))

        return ( term, dt )

    def to_url(self, value):
        term, date_time = value
        date, time = str(date_time).split()
        time, _ = time.split('.')

        return f'{term}={date}T{time}'