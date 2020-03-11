import SatApi from "../Definitions/SatApi"
import { authToken } from "../Definitions/BrowserCookie";
/* GET requests from API */

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

// Get all components connected to given satellite existing in the database
export const fetchComponents = (satId) => async dispatch => {
    dispatch({type: "FETCHING_COMPONENTS", isLoading: true});

    if (satId) {
        await SatApi.get(`api/sat/${satId}/comp/`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': `Token ${authToken}`
            }
        })
            .then(response => dispatch({type: "FETCH_COMPS", payload: response.data.Components, isLoading: false}))
            .catch(error => dispatch({type: "SIGNED_OUT", payload: error, isLoading: false}))
    } else {
        dispatch({type: "NO_SAT_SELECTED", selected: false})
    }
};

// Get satellite objects from API
export const fetchSatellites = () => async dispatch => {
    await SatApi.get('api/sat/', {
        headers: {
            'Authorization': `Token ${authToken}`
        }
    })
        .then(response => dispatch({type: "FETCH_SATS", payload: response.data.satellites}))
        .catch(error => dispatch({type: "FETCH_SATS_FAIL", error: error, message: "Please make sure you are signed in"}))
};