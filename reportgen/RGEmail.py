from email.message import EmailMessage
import smtplib
import mysql.connector
from getpass import getpass
from mysql.connector import Error

dbuser= input("Enter the database username: ")
dbpass = getpass('Enter your database password: ')
odasuser= input('Enter email login info: ')
odaspass= input('Enter email login info: ')
try:
    connection = mysql.connector.connect(host='database-2.cj3ycg4g1shd.us-west-1.rds.amazonaws.com',
                                         database='newdb',
                                         user=dbuser,
                                         password=dbpass)

    sql_select_Query = "select * from satellites"
    cursor = connection.cursor()
    cursor.execute(sql_select_Query)
    records = cursor.fetchall()
    eString= ''
    print("Total number of rows in satellites is: ", cursor.rowcount)

    print("\nThese are the satellites in the datbase: ")
    for row in records:
        eString += "Name of the satellite: "+ row[0] + "\n"
        eString += "Current CPU temperature: "+ row[1]+ "\n"
        eString +="Satellite Voltage: "+ row[2]+ "\n"
        eString +="Current Orbit: "+ row[3]+ "\n" + "\n"
    print(eString)
    rgemail= odasuser
    rgpass= odaspass
    msg = EmailMessage()
    msg['Subject'] = 'This is your Generated Report'
    msg['From'] = rgemail
    msg['To'] = 'richardbalbuena1337@gmail.com'
    msg.set_content(eString)
    with smtplib.SMTP_SSL('smtp.gmail.com',465) as smtp:
        smtp.login(rgemail, rgpass)
        smtp.send_message(msg)

except Error as e:
    print("Error connecting to database", e)
finally:
    if (connection.is_connected()):
        connection.close()
        cursor.close()
        print("The connection has closed")