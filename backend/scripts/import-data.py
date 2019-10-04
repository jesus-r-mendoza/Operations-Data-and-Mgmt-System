import os
from tempfile import TemporaryDirectory
from argparse import ArgumentParser
from os.path import exists
from zipfile import ZipFile
from datetime import datetime

parser = ArgumentParser()
parser.add_argument('action', help='use either \"setup\" or \"extract\" to specify action')

args = parser.parse_args()

print()
if args.action == 'setup':
    setup = True
elif args.action == 'extract':
    setup = False
else:
    print(f"'{args.action}' is not a recognized flag.\nusage: $ python import-data.py [ setup | extract ]")
    exit()

if setup:
    xtce_dir = input('Enter the directory of your exported project:\n')
    print()

cosmos_proj = input('Enter the path to the COSMOS project:\n')
print()

if not setup:
    tlm_bin_file = input('Enter the path to the tlm bin file:\n')
    print()
    tlm_output_dir = input('Enter the path to the directory where the output file will be created:\n')
    print()

targets_dir = cosmos_proj + '/config/targets'
tools_dir = cosmos_proj + '/tools'
system_file = cosmos_proj + '/config/system/system.txt'
cfg_files_dir = cosmos_proj + '/config/targets/cfg'
ignore_targets = ['COSMOS', 'SYSTEM']
ignore_xtce = ['cosmos.xtce', 'system.xtce']

if setup:
    all_paths_real = exists(cosmos_proj) and exists(targets_dir) and exists(xtce_dir) and exists(system_file)
else:
    all_paths_real = exists(tlm_bin_file) and exists(tools_dir)

print('Targets will be placd into:', targets_dir,'\n')

def convert_xtce_files(path):
    os.chdir(path)
    xtce_files = []
    targets = []
    for curr_dir, subdirs, files in os.walk(path):
        os.chdir(curr_dir)
        targets += [t for t in subdirs if t.isupper() and t not in ignore_targets]
        for f in files:
            if f.endswith('.xtce') and f not in ignore_xtce:
                xtce_files.append( (f, os.path.abspath(f)) )

    print(f'Found [{len(xtce_files)}] xtce files = ', [x for x, _ in xtce_files])

    total_files_converted = 0
    for xtce, path in xtce_files:
        print('\n=====================================')
        print(f'Converting file: [{xtce}]')
        print('=====================================\n')
        os.system(f'xtce_converter --import \"{path}\" \"{targets_dir}\"')
        total_files_converted += 1

    os.chdir(tools_dir)
    print(f'\nSuccessfully converted [{total_files_converted}] files from .xtce format\n')
    return targets

def declare_targets(targets):
    update_lines = []
    with open(system_file, 'r') as system:
        lines = system.readlines()

        last_declaration = 0
        for i in range(len(lines)-1):
            if i == 0:
                words1 = lines[i].split()
                words2 = lines[i+1].split()
            else:
                words1 = words2
                words2 = lines[i+1].split()

            if words1 and words1[0] == 'DECLARE_TARGET' and words1[1] in targets:
                targets.remove(words1[1])

            if words1 and words1[0] == 'DECLARE_TARGET' and (not words2 or words2[0] != 'DECLARE_TARGET'):
                last_declaration = i+1
                break

        if targets:
            for tar in targets:
                lines.insert(last_declaration, 'DECLARE_TARGET ' + tar + '\n')
                print('\n=====================================')
                print(f'Declaring: [{tar}] as COSMOS target ...')
                print('=====================================\n')
        else:
            print('\n=====================================')
            print('No new targets added, may already be declared.')
            print('=====================================\n')

        update_lines = lines
        
    with open(system_file, 'w') as system:
        system.writelines(update_lines)

def create_config_file(target, tlm_file_path):
    cfg_lines = []
    with open(tlm_file_path, 'r') as tlm_file:
        tar = ''
        packet = ''
        item = ''
        for line in tlm_file:
            words = line.split()
            if len(words) >= 3 and words[0] == 'TELEMETRY':
                tar = words[1]
                packet = words[2]

            if words and 'ITEM' in words[0]:
                item = words[1]

            if not tar or not packet or not item:
                continue

            line_to_add = f'ITEM {tar} {packet} {item}\n'
            cfg_lines.append(line_to_add)
            
            item = ''

    os.chdir(cfg_files_dir)
    with open(f'{target}_cfg.txt', 'w') as f:
        f.writelines(cfg_lines)

    print('Successfully wrote config file for target:', target.upper())

def create_config_files():
    if not exists(cfg_files_dir):
        os.chdir(targets_dir)
        os.mkdir('cfg')
    with os.scandir(targets_dir) as subdirs:
        targets = [target.name for target in subdirs if target.name.isupper() and target.is_dir()]

    print(f'\nFound [{len(targets)}] targets to create/update config files for..\n  ',targets)
    os.chdir(cfg_files_dir)

    tar_tlm_files = []
    for target in targets:
        tar_tlm_dir = targets_dir + '/' + target + '/cmd_tlm'
        if exists(tar_tlm_dir):
            with os.scandir(tar_tlm_dir) as tlm_dir:
                for item in tlm_dir:
                    if item.is_file() and item.name.endswith('tlm.txt') and target.lower() in item.name:
                        tar_tlm_files.append( (target.lower(), tar_tlm_dir + '/' + item.name) )

    print(f'Found [{len(tar_tlm_files)}] targets that have specified tlm.txt files..\n')
    
    print('\n=====================================')
    print('Writing Config files for targets ...')
    print('=====================================\n')
    for tar, path in tar_tlm_files:
        create_config_file(tar, path)
    print()

def setup_cosmos_target():
    with ZipFile(xtce_dir, 'r') as xtce_zipped:
        with TemporaryDirectory() as tmpdir:
            xtce_zipped.extractall(path=tmpdir)
            targets = convert_xtce_files(tmpdir)
    print('Targets Found =', targets)
    declare_targets(targets)
    create_config_files()

def extract_tlm_data():
    print('\n=====================================')
    print('Extracting the Telementry data ...')
    print('=====================================\n')

    with os.scandir(cfg_files_dir) as cfg_files:
        files = [f.name for f in cfg_files if f.is_file() and f.name.endswith('cfg.txt')]

    cfgs = { k:(v, cfg_files_dir+'/'+v) for k, v in enumerate(files) }

    print(f'Found [{len(files)}] config files to use for tlm data.')
    print('Select one or more files to use for tlm extraction. Seperate multiple inputs with spaces.')
    print('Config Files:\n')
    for k, name in cfgs.items():
        print(f'    {k}.  {name[0]}')
    print()
    selected = input('Enter the # of each file you want to use: ')
    selected = selected.split()
    print()
    os.chdir(tools_dir)
    for option in selected:
        curr_date = datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
        name = cfgs[int(option)][0][0:-8].upper()
        tlm_output = f'{tlm_output_dir}/{name}_{curr_date}.txt'
        os.system(f'ruby TlmExtractor -c \"{cfgs[int(option)][1]}\" -i \"{tlm_bin_file}\" -o \"{tlm_output}\"')
        print(f'Successfully extracted telemetry data\n')

if all_paths_real:
    if setup:
        setup_cosmos_target()
    else:
        extract_tlm_data()
    print('== Done ==\n')
else:
    print('\n*** Some of the paths you entered do not exist. Please try again. ***\n')
