##### The Backend portion of **ODAS** serves as an **API** to allow the Frontend to fetch and post data from our remote servers hosted on **AWS**

### The following guide provides details about available **API** endpoints

Method | Endpoint | Description
--- | --- | ---
GET | api/sat/ | Get ***all*** of the satellites
GET | api/comp/ | Get ***all*** of the components
GET | api/meas/ | Get ***all*** of the measurements
GET | api/units/ | Get ***all*** of the units
GET | api/sat/\<sat id>/recent/\<quantity>/ | Get (up to) the ***quantity*** most recent measurments pertaining to the specified satellite, regarless of component
GET | api/sat/\<sat id>/comp/\<comp id>/recent/\<quantity>/ | Get (up to) the ***quantity*** most recent measurments of the specified component, for the specified satellite
GET | api/sat/\<sat id>/comp/\{\<comp id>+\<comp id>+\<comp id> ... }/recent/\<quantity>/ | Gets (up to) the ***quantity*** most recent measurements for each of the specified components, of the specified satellite
GET | api/sat/\<sat id>/meas/from=\<datetime>/to=\<datetime>/ | Get ***all*** of the measurements recorded during the specified datetime range, for the specified satellite regardless of component
GET| api/sat/\<sat id>/meas/comp/\<comp id>/from=\<datetime>/to=\<datetime>/ | Get ***all*** of the measurements recorded during the specified datetime range, for the specified component of the specified satellite
POST | email/ | Sends email to the specified email, from **ODAS**; Specify ***your_email***, ***subject***, ***message*** in the POST request
POST | files/upload/ | Uploads the specified file to our **ODAS** servers; Specify ***upfile*** in the POST request
POST | files/\<file id>/ | Deletes the specified file from our **ODAS** servers