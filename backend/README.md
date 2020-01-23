##### The Backend portion of **ODAS** serves as an **API** to allow the Frontend to fetch and post data from our remote servers hosted on **AWS**

### The following guide provides details about available **API** endpoints

---
Method | Endpoint | Description | JSON Response | Rquires Authentication
--- | --- | --- | --- | ---
GET | api/sat/ | Get ***all*** of the satellites | [Serialized](#Serialized) | No
GET | api/comp/ | Get ***all*** of the components | [Serialized](#Serialized) | No
GET | api/meas/ | Get ***all*** of the measurements | [Serialized](#Serialized) | No
GET | api/units/ | Get ***all*** of the units | [Serialized](#Serialized) | No
GET | api/sat/\<sat id>/comp/ | Get all of the components of the specified satellite | [Serialized](#Serialized) | Yes
GET | api/sat/\<sat id>/recent/\<quantity>/ | Get (up to) the ***quantity*** most recent measurments pertaining to the specified satellite, regardless of component | [Unspecified Components](#Unspecified-Components) | Yes
GET | api/sat/\<sat id>/comp/\<comp id>/recent/\<quantity>/ | Get (up to) the ***quantity*** most recent measurments of the specified component, for the specified satellite | [Specified Component](#Specified-Component) | Yes
GET | api/sat/\<sat id>/comp/\{\<comp id>+\<comp id>+\<comp id> ... }/recent/\<quantity>/ | Gets (up to) the ***quantity*** most recent measurements for each of the specified components, of the specified satellite | [Unspecified Components](#Unspecified-Components) | Yes
GET | api/sat/\<sat id>/meas/from=\<datetime>/to=\<datetime>/ | Get ***all*** of the measurements recorded during the specified datetime range, for the specified satellite regardless of component | [Unspecified Components](#Unspecified-Components) | Yes
GET| api/sat/\<sat id>/meas/comp/\<comp id>/from=\<datetime>/to=\<datetime>/ | Get ***all*** of the measurements recorded during the specified datetime range, for the specified component of the specified satellite | [Specified Component](#Specified-Component) | Yes
POST | email/ | Sends email to the specified email, from **ODAS**; Specify ***your_email***, ***subject***, ***message*** in the POST request | | Not yet
POST | files/upload/ | Uploads the specified file to our **ODAS** servers; Specify ***upfile*** in the POST request | | Not yet
POST | files/\<file id>/ | Deletes the specified file from our **ODAS** servers | | Not yet
POST | register/ | Allows a user to sign up to use ODAS, must provide **username**, **email**, and **pass** in POST request to sign up. Optionally, if **code** is provided, (this is the 12 char invite code), then a user can sign up and will automatically be added to the organization which provided that invite code | | No
POST | create-org/ | Allows user to create and organization, will be returned an invite code for that organization if creation is successful. Must provide **org_name**, and **pass** in POST request. Password is required to prevent any user from creating an org, this would't be realistic. Password simulates purchasing a subcription to ODAS (or something similar) | |  Yes
POST | login/ | Allows user to login, returns authentication token if login successful. Must provide **username** and **pass** in POST request | | No
DELETE | logout/ | User must be logged in to log out, only need to pass authorization token in request header to logout. Then invalidates that token | | Yes
---

## Authentication

When a user creates an account, backend's response will contain an authorization token that will be needed to acces other api endpoints. The frontend is in charge of storing this token and providing it in the `Authorization` header as part of every request (POST and GET) which requires it (see table above). This token may be stored as a cookie or in some other way. The value of this `Authorization` header must contain the word `Token` followed by a space, and the token value.

Example Header:

Header | Value
--- | ---
Content-type |  `Authorization` <br>
value | `Token d9e1rd2a220eef50j6cb032c1f90e254177a9ed`

If this were a POST request and you also needed to provide other details, then you can include the following header.

Header | Value
--- | ---
Content-type | application/json

and in the body of the request, provide the key value pairs of the data.


## Examples

For these example links to work, be sure that the backend server is running on your local machine. To learn how to run the backend server, click [here](#Running-the-Backend-Server).

> [`api/sat/`](http://127.0.0.1:8000/api/sat/)

> [`api/comp/`](http://127.0.0.1:8000/api/comp/)

> [`api/meas/`](http://127.0.0.1:8000/api/meas/)

> [`api/units/`](http://127.0.0.1:8000/api/units/)

> [`api/sat/1/comp/`](http://127.0.0.1:8000/api/sat/1/comp/)

> [`api/sat/1/recent/20/`](http://127.0.0.1:8000/api/sat/1/recent/20/)

> [`api/sat/4/comp/10/recent/50/`](http://127.0.0.1:8000/api/sat/4/comp/10/recent/20/)

> [`api/sat/1/comp/1+2+5/recent/10/`](http://127.0.0.1:8000/api/sat/1/comp/1+2+5/recent/10/)

> [`api/sat/3/meas/from=2019-01-01T22:43:23/to=now/`](http://127.0.0.1:8000/api/sat/3/meas/from=2019-01-01T22:43:23/to=now/)

> [`api/sat/2/meas/from=2019-01-01T22:43:23/to=2019-11-19T00:00:00/`](http://127.0.0.1:8000/api/sat/2/meas/from=2019-01-01T22:43:23/to=2019-11-19T00:00:00/)

> [`api/sat/4/meas/comp/10/from=2019-01-01T22:43:23/to=now/`](http://127.0.0.1:8000/api/sat/4/meas/comp/10/from=2019-01-01T22:43:23/to=now/)

> [`api/sat/4/meas/comp/10/from=2019-01-01T22:43:23/to=2019-11-19T00:00:00/`](http://127.0.0.1:8000/api/sat/4/meas/comp/10/from=2019-01-01T22:43:23/to=2019-11-19T00:00:00/)

---

## Running ODAS with Docker

### Step 1
Install Docker. To learn how to install docker click [here](https://www.docker.com/products/docker-desktop). You'll see a button to install Docker Desktop; you'll need to create an account with Docker Hub if you don't already have one. Also make sure you have docker-compose installed with it.

### Step 2
If you don't have the ODAS repository, clone it using:

> `$ git clone https://github.com/jesus-r-mendoza/Operations-Data-and-Mgmt-System.git`

then, change directory into the repository's base directory using:

> `$ cd Operations-Data-and-Mgmt-System`

### Step 3
Once your in the base directory, simply run:

> `$ docker-compose up`

This will run both the frontend and backend containers.

For testing purposes, the backend container is accessible through your container's ip or localhost at port 8000; and the frontend container is accessible through your container's ip or localhost at port 3000.

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

> `$ cd odas_backend`

### Step 5
Run the server

> `$ python manage.py runserver`

---

## JSON Reponses

### Serialized
A `Serialized` response means that the server simply responds with a list of all records, each item in the list is a serialzation of a particular record. Each item contains all of the attributes that describe that object. For example, the serialization of a Satellite would be as such:

```json
{
    "id": 1,
    "name": "Sample",
    "mission_description": "Sample mission",
    "year_launched": "2019-10-07T04:08:29.600910Z"
}
```

Refer to the most recent Database schema diagram for details regarding object attributes

### Unspecified Components
An `Unspecified Components` response means that the server will provide only the measurement data ***AND*** the serialized component for each measurement. This is because, the requested `url` could result with data from multiple components, so we cannot omit the component serialization. Along with the list of measurements, the Satellite is also returned, since it might be of use for the front end. Here is an example response.

```json
{
    "Satellite": {
        "name": "Sample",
        "mission_description": "Sample mission",
        "year_launched": "2019-10-07T04:08:29.600910Z"
    },
    "Measurements": [
        {
            "component_name": [
                "Comp 1"
            ],
            "component_model": [
                "Sample"
            ],
            "component_category": [
                "Sample"
            ],
            "component_description": [
                "Sample"
            ],
            "units": "Sample",
            "time": "2019-10-25T16:42:38.348Z",
            "value": 1.0
        },
        {
            "component_name": [
                "Comp 2"
            ],
            "component_model": [
                "Sample"
            ],
            "component_category": [
                "Sample"
            ],
            "component_description": [
                "Sample"
            ],
            "units": "Sample",
            "time": "2019-10-24T16:42:38.348Z",
            "value": 2.0
        }
    ],
    "Quantities": {
        "Comp 1": 1,
        "Comp 2": 1
    },
    "comp_specified": true,
    "data": true,
    "error": "None"
}
```

In the case of the multi-component endpoint, if a component id does not exist, or does not belong to the specified satellite like [`api/sat/1/comp/1+2+3+4+5/recent/10/`](http://127.0.0.1:8000/api/sat/1/comp/1+2+3+4+5/recent/10/) (here the component with `id = 3` and `id = 4` do not belong to the satellite with `id = 1`), then an additional parameter will appear in the `Quantites` section. This value will contain a list of all of the id's of the components that don't exist and/or belong to the specified satellite. Here is an example of what the `Quantities` attribute will look like in this case.

```json
{
    ...,
    "Quantities": {
        "Comp 1": 1,
        "Comp 2": 1,
        "DNE": [
            3,
            4
        ]
    },
    ...
}
```


### Specified Component
An `Specified Components` response means that the server will provide only the measurement data, the `url` indicates which component's measurements should be returned. In this case, we can omit the component serialization, since the requester *knows* that the measurements belong to the same component. Along with the list of measurements, the Satellite is also returned, since it might be of use for the front end. Here is an example response. Here is an example response.

```json
{
    "Satellite": {
        "name": "Sample",
        "mission_description": "Sample mission",
        "year_launched": "2019-10-07T04:08:29.600910Z"
    },
    "Measurements": [
        {
            "units": "Sample",
            "time": "2019-10-25T16:42:38.348Z",
            "value": 1.0
        },
        {
            "units": "Sample",
            "time": "2019-10-24T16:42:38.348Z",
            "value": 1.1
        },
        {
            "units": "Sample",
            "time": "2019-10-24T16:42:38.348Z",
            "value": 1.2
        },
        {
            "units": "Sample",
            "time": "2019-10-24T16:42:38.348Z",
            "value": 1.3
        }
    ],
    "Quantities": {
        "Comp 1": 1
    },
    "comp_specified": false,
    "data": true,
    "error": "None"
}
```

### Both Uspecified and Specified
You may have noticed two lingering attributes that were also returned for both of these types of responses. In both cases, the will always be at least two specified attributes, `data` and `error`. These two are always specified. In case that a request was successful, `data` will be `true` and `error` will be `None`. However, if a response is unsuccessfull, `data` will return `false` and `error` will have an associated error message. In addition, to assist the frontend in distinguishing these two responses, the `comp_specified` attribute states whether the serialized component accompanies every measurement. `true` for `Unspecified` responses (since a serilization of the compnent is included with each measurement). And `false` for `Specified` responses, since they are omitted in these responses.