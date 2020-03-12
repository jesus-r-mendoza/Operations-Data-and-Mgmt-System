import SatApi from "../Definitions/SatApi";
import {authToken} from "../Definitions/BrowserCookie";
import moment from "moment";

// Get all recent measurements from components of a particular satellite
// Method defaults to ALL measurements and ALL components
export const getRecentMeasurements = (satId, compIds = [], quantity) => async dispatch => {
    dispatch({type: 'FETCHING_RECENTS', isLoading: true});

    let url;
    let compIdString = '';

    // Appends component IDs to a string which is then placed in the url
    if (compIds.length !== 0) {
        compIds.forEach((id, index) => {
            if (index === 0) {

                compIdString = id
            } else {

                compIdString += `+${id}`
            }
        });

        url = `/api/sat/${satId}/comp/${compIdString}/recent/${quantity}/`;
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

export const getMeasurementsByTime = (satId, compIds = [], rawStartDate, rawEndDate) => async dispatch => {
    dispatch({type: "FETCHING_TIME_MEAS", isLoading: true});

    let url;
    let compIdString = '';
    const startDate = moment.utc(rawStartDate).format("YYYY-DD-MMThh:mm:ss");
    const endDate = moment.utc(rawEndDate).format("YYYY-DD-MMThh:mm:ss");
    console.log(startDate);
    console.log(endDate);

    if (compIds.length !== 0) {
        compIds.forEach(id => {
            compIdString += `+${id}`
        });

        url = `api/sat/${satId}/meas/comp/${compIdString}/from=${startDate}/to=${endDate}/`
    } else {
        url = `api/sat/${satId}/meas/from=${startDate}/to=${endDate}/`
    }

    SatApi.get(url, {
        headers: {
            'Authorization': `Token ${authToken}`
        }
    })
        // .then(response => dispatch({type: 'FETCH_MEAS_WITH_TIME', payload: response}))
        // .catch(error => dispatch({type: 'FETCH_MEAS_FAIL', payload: error}))
        .then(response => console.log(response))
        .catch(error => console.log(error))
};