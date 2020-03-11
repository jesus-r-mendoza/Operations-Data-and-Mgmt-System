import SatApi from "../Definitions/SatApi";
import {authToken} from "../Definitions/BrowserCookie";

// Get all recent measurements from components of a particular satellite
// Method defaults to ALL measurements and ALL components
export const getRecentMeasurements = (satId, compIds = [], quantity) => async dispatch => {
    dispatch({type: 'FETCHING_RECENTS', isLoading: true});

    let url;
    let compIdString = '';

    // Appends component IDs to a string which is then placed in the url
    // TODO append is not adding a plus sign. Only adding a comma for some reason
    if (compIds.length !== 0) {
        compIds.forEach((id, i) => {
            if (i === 0) {
                compIdString = id
            } else {
                compIdString += `+${id}`
            }
        });
        console.log(compIdString);
        url = `/api/sat/${satId}/comp/${compIds}/recent/${quantity}/`;
    } else {
        url = `/api/sat/${satId}/recent/${quantity}/`;
    }

    await SatApi.get(url, {
        headers: {
            'Authorization': `Token ${authToken}`
        }
    })
        .then(response => dispatch({type: 'FETCH_RECENTS', payload: response.data}))
        .catch(error => dispatch({type: 'FETCH_RECENTS_FAIL', payload: error}))
};