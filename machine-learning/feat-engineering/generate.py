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
    date_strs = []
    values = []
    for csv_file in data_files:
        vals = []
        dates = []
        path = f'{basedir}generated/{csv_file}'
        with open(path, 'r') as csv:
            data = csv.read()
        lines = data.split('\n')
        for line in lines:
            parts = line.split(',')
            if len(parts) == 2:
                dates.append( parts[0] )
                vals.append( float(parts[1]) )
        date_strs.append(dates)
        values.append(vals)
    return date_strs, values

all_csv_dates, all_csv_values = read_values()

def generate_stats_features(values, window):
    predictions = []
    for i in range(window, len(values)):
        vals = values[i-window:i]
        avg = statistics.mean(vals)
        stdev = statistics.stdev(vals)
        minimum = min(vals)
        maximum = max(vals)
        fluctuation = maximum - minimum
        new_features = avg, stdev, minimum, maximum, fluctuation
        predictions.append(new_features)

    # adding missing values
    non_values = [ ('-','-','-','-','-') for _ in range(window) ]
    predictions = non_values + predictions
    return predictions

def generate_time_features(formated_time_str):
    dt = datetime.strptime(formated_time_str, '%Y-%m-%dT%H:%M:%S.%f')
    return dt.hour, dt.minute, dt.second, dt.microsecond

def save_new_file_lines():
    windows = 3, 5, 7
    for x in range(len(data_files)):
        lines = []

        csv = data_files[x]
        dates = all_csv_dates[x]
        vals = all_csv_values[x]

        gen_feats = []
        for win in windows:
            new_feats = generate_stats_features(vals, win)
            gen_feats.append(new_feats)

        for i in range(len(vals)):
            line = f'{vals[i]},'
            for feat_set_list in gen_feats:
                for feat in feat_set_list[i]:
                    line += f'{feat},'

            for feat in generate_time_features(dates[i]):
                line += f'{feat},'

            line += '\n'
            lines.append(line)

        path = f'{basedir}generated/engineered/{csv}'
        with open(path, 'w') as engineered_file:
            header = 'Value,Avg3,Stdev3,Minimum3,Maximum3,Fluctuation3,'
            header += 'Avg5,Stdev5,Minimum5,Maximum5,Fluctuation5,'
            header += 'Avg7,Stdev7,Minimum7,Maximum7,Fluctuation7,'
            header += 'Hour,Minute,Second,Microsecond,\n'
            engineered_file.write(header)
            engineered_file.writelines(lines)
            print(f'Wrote {len(lines)} lines to {path}')
    print()

save_new_file_lines()
