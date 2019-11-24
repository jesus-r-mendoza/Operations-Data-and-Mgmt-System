import SatApi from "../Apis/SatApi"
// const postHeaders = {
//     'Content-Type': 'multipart/form-data'
// };

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

    dispatch({type: "FETCH_COMP", payload: response.data});
};

export const fetchSatellites = () => async dispatch => {
    // Needed exact URL including the slashes?
    const response = await SatApi.get("api/sat/", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        }
    });

    dispatch({type: "FETCH_SATS", payload: response.data});
};

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


