import SatApi from "../Apis/SatApi"

// Get the unit values from API
export const fetchUnits = () => async dispatch => {
    // Needed exact URL including the slashes
        const response = await SatApi.get("api/units/", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            }
        });

        dispatch({type: "FETCH_UNITS", payload: response.data});
};

export const fetchComponents = () => async dispatch => {
    // Needed exact URL including the slashes?
    const response = await SatApi.get("api/comp/", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        }
    });

    dispatch({type: "FETCH_COMPS", payload: response.data});
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

// Post a file to the server *Currently not implemented*
export function postFile (file) {
    console.log(file);
    return (dispatch, getState) => {
        dispatch({type: "REQUEST STARTED"});

        SatApi.post("files/upload/", {data: file})
            .then(
                res => dispatch({type: "REQUEST_ACCEPTED", payload: res}),
                error => dispatch({type: "REQUEST_FAILED", error: error})
            )
    }
}

export const selectSatellite = (satellite) => {
    return {
        type: 'SAT_SELECTED',
        payload: satellite
    };
};

// Store the amount of recent reports to show on report pages
export const selectRecent = (recent) => {
    return {
        type: "RECENT_SELECTED",
        payload: recent
    };
};

// Store the selected date on reports header
export const selectStartDate = (date) => {
    return {
        type: 'START_DATE_SELECTED',
        payload: date
    };
};

export const selectEndDate = (date) => {
    return {
        type: 'END_DATE_SELECTED',
        payload: date
    };
};

