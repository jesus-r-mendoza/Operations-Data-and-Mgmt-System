import React from 'react';
import axios from 'axios';

export default function () {
    console.log("Outside functions coming in")
}

// TODO look into JS modules
export function makeGetRequest(endpoint) {
    let value;
    axios.get(endpoint, {
        headers: {
            'Content-type': "application/json"
        }
    })
        .then((res) => {
            value = res.data.map(function(unit) {
                return (unit.units)
            })
        })
        .catch(function (err) {
            console.log(err);
        });
}

    // TODO implement post request
export function makePostRequest(endpoint, postData) {
    axios.post(endpoint, {
        postData
    })
}