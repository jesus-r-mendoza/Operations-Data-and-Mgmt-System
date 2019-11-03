import React from 'react';
import axios from 'axios';

export default function () {
    console.log("Outside functions coming in")
}

// TODO look into JS modules
export async function makeGetRequest(endpoint) {
    return await axios.get(endpoint, {
        headers: {
            'Content-type': "application/json"
        }
    })
        .then((res) => {
            this.state({
                data: res.data
            });
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