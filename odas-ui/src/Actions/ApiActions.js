import SatApi, {apiURL} from "../Definitions/SatApi"
import axios from 'axios';
import {authToken} from "../Definitions/BrowserCookie";
/*GET requests from API*/

// Get the unit values from API
export const fetchUnits = () => async dispatch => {
    // Needed exact URL including the slashes
    const response = await SatApi.get(`api/units/`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        }
    });

    dispatch({type: "FETCH_UNITS", payload: response.data});
};

// TODO return to implement after create/join organization
// Get all components connected to given satellite existing in the database
export const fetchComponents = (satId = 1) => async dispatch => {

    if (authToken !== undefined && authToken !== null) {
        const response = await SatApi.get(`api/sat/${satId}/comp/`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': `Token ${authToken}`
            }
        });
            // .catch(function(error){console.log(error)});

        dispatch({type: "FETCH_COMPS", payload: response});
    } else {
        dispatch({type: "SIGNED_OUT", payload: "Please sign in to continue."})
    }
};

// Get satellite objects from API
export const fetchSatellites = () => async dispatch => {
    console.log(authToken);

    await axios(`${apiURL}api/sat/`, {
        headers: {
            'Authorization': `Token 7dfc96bade2c9d35e79d3161414e3fc9d5f56598`
        }
    })
        .then(response => dispatch({type: "FETCH_SATS", payload: response.data.satellites}))
        .catch(error => dispatch({type: "FETCH_SATS_FAIL", error: error}))
};

// export const