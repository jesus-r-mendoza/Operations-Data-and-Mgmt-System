-- ODAS SQL ----

use odas;


DROP table if exists SATELLITE;
DROP table if exists POSITION;
DROP table if exists CPU;
DROP table if exists POWERSUPPLY;
DROP table if exists THERMOMETER;
DROP table if exists PROPULSION;
DROP table if exists CAMERA;
DROP table if exists SOLARPANEL;


-- SATELLITE TABLE  #1--

CREATE TABLE SATELLITE (
    Sid INT UNIQUE,
	Sname VARCHAR(15),
    Ybuild DATE,
    Sweight INT(5),
    PRIMARY KEY (Sid)
   
);

-- POSITION TABLE #2---

CREATE TABLE POSITION (
    Pid INT UNIQUE,
    Sid INT,
    Altitude VARCHAR(9),
    Latitude VARCHAR(9),
    Longtitude VARCHAR(9),
	Velocity INT,
	PosTime TIME,
PRIMARY KEY (Pid)
);

-- CPU TABLE #3 --

CREATE TABLE CPU( 
	Camid INT UNIQUE,
	Sid INT,
    CPUModel VARCHAR(15),
	CPUTemp INT(9),
	CPUTime DATE,
PRIMARY KEY (Camid)
);

-- POWERSUPPLY TABLE #4 ---

CREATE TABLE POWERSUPPLY(
	PowId INT UNIQUE,
 	Sid INT,
	PowModel VARCHAR(15),
	PowTime DATE,
PRIMARY KEY (PowId)
);

-- THERMOMETER TABLE #5 ---

CREATE TABLE THERMOMETER(
	TherId INT UNIQUE,
	Sid INT,
	TherTime DATE,
PRIMARY KEY (TherId)
);

-- PROPULSION TABLE #6---

CREATE TABLE PROPULSION(
	PropId INT UNIQUE,
	Sid INT,
	PropTemp INT(9),
	PropTime DATE,
PRIMARY KEY (PropId)
);

-- CAMERA TABLE #7---

CREATE TABLE CAMERA(
	CamId INT UNIQUE,
	Sid INT,
	CamTemp INT(9),
	CamTime DATE,
	CamModel VARCHAR(8),
PRIMARY KEY (CamId)
);

-- SOLARPANEL TABLE #8---

CREATE TABLE SOLARPANEL(
	SPId INT UNIQUE,
	Sid INT,
	Volt INT,
	SPCurrent INT,
	SPTime DATE,
PRIMARY KEY (SPId)
);