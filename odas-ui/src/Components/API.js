import React from 'react';
import axios from 'axios';
//TODO Attempt to consolidate API calls to speed up application and clean up code
const APIs = {
    unit: "http://localhost:8000/api/units/",
    component: "http://localhost:8000/api/components/"
};


export const getUnits = () => {
    axios.get(APIs.unit, {
        headers: {
            'Content-type': "application/json"
        }
    })
        .then(res => {
            return res
        })
        .catch(function (err) {
            console.log(err);
        });
};

export const getComponents = () => {
    axios.get(APIs.component, {
        headers: {
            'Content-type': "application/json"
        }
    })
        .then(res => {
            return res.data
        })
        .catch(function (err) {
            console.log(err);
        });
};
