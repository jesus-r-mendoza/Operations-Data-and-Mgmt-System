import SatApi from "../Definitions/SatApi";
import {authToken} from "../Definitions/BrowserCookie";

// Get all recent measurements from components of a particular satellite
export const getRecentMeasurements = (satId, quantity, compIds) => async dispatch => {
    dispatch({type: 'FETCHING_RECENTS', isLoading: true});

    let url;

    if (compIds) {
        url = `/api/${satId}/comp/${compIds}/recent/${quantity}`;
    } else {
        url = `/api/${satId}/recent/${quantity}`
    }

    await SatApi.get(url, {
        headers: {
            'Authorization': `Token ${authToken}`
        }
    })
        .then(response => dispatch({type: 'FETCH_RECENTS', payload: response.data}))
        .catch(error => dispatch({type: 'FETCH_RECENTS_FAIL', payload: error}))
};