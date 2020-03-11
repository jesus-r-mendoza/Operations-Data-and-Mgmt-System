# Operations Data Analysis and Mgmt System ( ODAS )

<div style="display: flex; justify-content: space-around; align-items: center;">
    <img src="resources/imgs/csula-sm.png" />
    <h2>Senior Design Project sponsored by</h2>
    <img src="resources/imgs/boeing-sm.png" />
</div>

### Team

Role | Name | Github |
--- | --- | --- |
Advisor | Prof. Soo Lim | |
Liaison | Raymond (Ray) Hogan | |
Liaison | Sen Yao | |
Team Lead | Jesus R Mendoza | <div class="github"> <img width="20px" height="20px" src="https://avatars2.githubusercontent.com/u/34051207?v=4" /> [jesus-r-mendoza](https://github.com/jesus-r-mendoza) </div>
Head of Design | Maximilian H Orozco | <div class="github"> <img width="20px" height="20px" src="https://avatars1.githubusercontent.com/u/25442889?v=4" /> [maxorozco213](https://github.com/maxorozco213) </div>
Documentation Manager | Richard Balbuena | <div class="github"> <img width="20px" height="20px" src="https://avatars2.githubusercontent.com/u/55844465?v=4" /> [rbalbue](https://github.com/rbalbue) </div>
Quality Assurance | Nathan Lee | <div class="github"> <img width="20px" height="20px" src="https://avatars3.githubusercontent.com/u/34043773?v=4" /> [nlee806](https://github.com/nlee806) </div>


### Project Description

**ODAS** is an elaborate software suite that provides tons of functionality for handling large quantities of Telemetry, right out of the box!

As more and more satellites are launched into orbit, it is important to track of the status of each one. We're developing **ODAS**, with guidance from our **Boeing** liaisons, to function as a central hub which focuses on monitoring the Health and Status of your satellites. **ODAS** does so by analyzing the Health and Status Telemetry for each of your satellites, and providing powerful analytical tools, via a user-friendly Web interface, that allows any user or organization to monitor the state of their satellites. From the beginning we designed **ODAS** to be an ***Easy-to-Use*** system that deals with all of the dirty work for you, ranging from Fault Detection using Machine Learning to scalable storage solutions to manage millions of Telemetry data points.

### Project Overview

- **Frontend** [<img width="20px" height="20px" src="https://avatars1.githubusercontent.com/u/25442889?v=4" />](#Team) [<img width="20px" height="20px" src="https://avatars3.githubusercontent.com/u/34043773?v=4" />](#Team)
    - React JS
        - State managment w/ Redux
    - Plotly JS

- **Backend** [<img width="20px" height="20px" src="https://avatars2.githubusercontent.com/u/34051207?v=4" />](#Team) [<img width="20px" height="20px" src="https://avatars2.githubusercontent.com/u/55844465?v=4" />](#Team)
    - Django
    - MySql

- **Machine Learning** [<img width="20px" height="20px" src="https://avatars2.githubusercontent.com/u/34051207?v=4" />](#Team) [<img width="20px" height="20px" src="https://avatars2.githubusercontent.com/u/55844465?v=4" />](#Team)
    - Pandas, Numpy, SKLearn, Keras
    - Forecasting
        - Sliding Window w/ Classical Machine Learning Algorithms
            - Support Vector Regressor
            - Random Forest Tree Regressor
        - RNN
            - Long Short Term Memory

- **Containerized Application** [<img width="20px" height="20px" src="https://avatars2.githubusercontent.com/u/34051207?v=4" />](#Team)
    - Docker
    - Docker-Compose

- **Amazon Web Services** [<img width="20px" height="20px" src="https://avatars2.githubusercontent.com/u/34051207?v=4" />](#Team) [<img width="20px" height="20px" src="https://avatars1.githubusercontent.com/u/25442889?v=4" />](#Team) [<img width="20px" height="20px" src="https://avatars2.githubusercontent.com/u/55844465?v=4" />](#Team)
    - EC2 (Ubunutu Linux)
    - RDS MySql
    - S3 Buckets

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

For testing purposes, the backend container is accessible through your container's ip or localhost at port 8080; and the frontend container is accessible through your container's ip or localhost at port 3000.
