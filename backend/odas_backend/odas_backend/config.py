def get_creds():
    try:
        creds = {}
        with open('../config.cfg', 'r') as cfg:
            for line in cfg:
                parts = line[:-1].split('::')
                creds[parts[0]] = parts[1]
                print(line, parts)
        return creds
    except FileNotFoundError:
        print("""
        ***********************************
        ** ERROR: config file not found. **
        ***********************************\n
        - Only ODAS developers have access to the config file

        - Not a dev on the ODAS team, sorry you'll have to update
          the settings.py to use default settings

        - Oh, you are an ODAS developer. Ok, then make sure you
          have the most recent config file, and place it into
          the correct directory. Then restart to get started!
        """)
        exit(1)
    except IndexError:
        print("""
        *********************************************************
        ** ERROR: index out of bounds. If you have this error, **
        ** please follow the steps below                       **
        *********************************************************\n
        1. Go to your config file
        2. The very last line in that file should be a new line character, go to it
        3. Erase that character (click mouse on last line, hit backspace)
        4. Now you should be on a line with actual written text
        5. To the end of that line, append any 'junk' character like: x
        6. Save your config file, and restart

        For example:
        
        If your config file looked like this:
        "
        key1::secret1
        key2::sectre2
        lastkey::lastsecret
         <- note that this line looks blank but contains a new line char
        " 

        Then it should look like this after:
        "
        key1::secret1
        key2::secret2
        lastkey::lastsecretx
        "
        Note that the new line char was removed, and a junk char 
        (in this case x) was appended to the end of the last line
        """)
        exit(1)
