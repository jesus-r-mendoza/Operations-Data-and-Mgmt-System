##### The Backend portion of **ODAS** serves as an **API** to allow the Frontend to fetch and post data from our remote servers hosted on **AWS**

### The following guide provides details about available **API** endpoints

---
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
---

## Examples

For these example links to work, be sure that the backend server is running on your local machine. To learn how to run the backend server, click [here](##Running-the-Backend-Server).

> [`api/sat/`](http://127.0.0.1:8000/api/sat/)

> [`api/comp/`](http://127.0.0.1:8000/api/comp/)

> [`api/meas/`](http://127.0.0.1:8000/api/meas/)

> [`api/units/`](http://127.0.0.1:8000/api/units/)

> [`api/sat/1/recent/20/`](http://127.0.0.1:8000/api/sat/1/recent/20/)

> [`api/sat/4/comp/10/recent/50/`](http://127.0.0.1:8000/api/sat/4/comp/10/recent/20/)

> [`api/sat/1/comp/1+2+5/recent/10/`](http://127.0.0.1:8000/api/sat/1/comp/1+2+5/recent/10/)

> [`api/sat/3/meas/from=2019-01-01T22:43:23/to=now/`](http://127.0.0.1:8000/api/sat/3/meas/from=2019-01-01T22:43:23/to=now/)

> [`api/sat/2/meas/from=2019-01-01T22:43:23/to=2019-11-19T00:00:00/`](http://127.0.0.1:8000/api/sat/2/meas/from=2019-01-01T22:43:23/to=2019-11-19T00:00:00/)

> [`api/sat/4/meas/comp/10/from=2019-01-01T22:43:23/to=now/`](http://127.0.0.1:8000/api/sat/4/meas/comp/10/from=2019-01-01T22:43:23/to=now/)

> [`api/sat/4/meas/comp/10/from=2019-01-01T22:43:23/to=2019-11-19T00:00:00/`](http://127.0.0.1:8000/api/sat/4/meas/comp/10/from=2019-01-01T22:43:23/to=2019-11-19T00:00:00/)

---

## Running the Backend Server

Note: You **MUST** have the configuration file in order to run the server

### Step 1
Once you've cloned our repository, navigate to the `backend/` directory

> `$ cd backend`

### Step 2
Install `pipenv` to handle all of the project's `python` dependencies

> `$ pip install pipenv`

### Step 3
Install all of the dependencies

> `$ pipenv install`

This should also launch a new virtual environment. If you've already installed the dependencies, then you can run `$ pipenv shell` instead

### Step 4
Navigate to the `odas_backend/` directory

> `$ odas_backend`

### Step 5
Run the server

> `$ python manage.py runserver`