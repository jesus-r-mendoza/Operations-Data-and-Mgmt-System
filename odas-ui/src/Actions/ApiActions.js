import SatApi from "../Apis/SatApi"
import Cookies from "universal-cookie";
/*GET requests from API*/

const cookie = new Cookies();

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
    // let errorMessage = '';
    const authToken = cookie.get('auth');

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
    const response = await SatApi.get("api/sat/", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        }
    });

    dispatch({type: "FETCH_SATS", payload: response.data});
};
