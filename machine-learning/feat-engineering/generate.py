import os
from datetime import datetime
import statistics

basedir = '../../../tlm-data/train/'

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#                            Reading Raw Tlm files                            #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

def get_csv_files():
    data_files = []
    with os.scandir(basedir) as dir:
        for item in dir:
            if item.is_file() and item.name[-4:] == '.csv':
                data_files.append(item.name)

    print(f'\nThere are {len(data_files)} csv files with data:')
    print(*data_files, sep=', ')
    print()
    return data_files

data_files = get_csv_files()

def process_file(data_file):
    values, nanos = [], []
    path = f'{basedir}{data_file}'
    with open(path, 'r') as data_csv:
        lines = [ x[:-1] for x in  data_csv.readlines() ]
        for line in lines[1:]:
            parts = line.split(',')
            if len(parts) < 4:
                continue
            _, val, time, _ = line.split(',')
            values.append(float(val))
            nanos.append(float(time))
        print(f'Read {len(values)} lines from {path}')
    return values, nanos

def save_csv_with_timestamp(filename, data):
    path = f'{basedir}generated/{filename}'
    with open(path, 'w') as csv:
        lines = []
        vals, times = data
        for i in range(len(vals)):
            val, time = vals[i], times[i]
            dt = datetime.fromtimestamp(time)
            date_str = dt.strftime('%Y-%m-%dT%H:%M:%S.%f')
            line = f'{date_str},{val}\n'
            lines.append(line)
        csv.writelines(lines)
    print(f'Saved {len(lines)} lines to generated/{filename} with formated timestamp string\n')

def read_reformat_and_store():
    data = []
    for csv in data_files:
        vals, time = process_file(csv)
        stored = (vals, time)
        data.append(stored)
        save_csv_with_timestamp(csv, stored)

read_reformat_and_store()

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#                            Generating new Features                          #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

def read_values():
    values = []
    for csv_file in data_files:
        vals = []
        path = f'{basedir}generated/{csv_file}'
        with open(path, 'r') as csv:
            data = csv.read()
        lines = data.split('\n')
        for line in lines:
            parts = line.split(',')
            if len(parts) == 2:
                vals.append( float(parts[1]) )
        values.append(vals)
    return values

all_csv_values = read_values()

def moving_avg(values, window):
    predictions = []
    for i in range(window, len(values)):
        vals = values[i-window:i]
        avg = statistics.mean(vals)
        pred, actual = avg, values[i]
        predictions.append(pred)

    # adding missing values
    non_values = [ '-' for _ in range(window) ]
    predictions = non_values + predictions
    return predictions
