import SatApi from "../Apis/SatApi"

export const fetchUnits = () => async dispatch => {
    // Needed exact URL including the slashes?
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
    const response = await SatApi.get("api/components/", {
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
    const response = await SatApi.get("api/satellites/", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        }
    });

    dispatch({type: "FETCH_SATS", payload: response.data});
};

export const selectSatellite = (satellite) => {
    return {
        type: 'SAT_SELECTED',
        payload: satellite
    };
};


