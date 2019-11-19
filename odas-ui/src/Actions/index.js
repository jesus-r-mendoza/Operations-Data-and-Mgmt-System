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

export const selectSatellite = (satellite) => {
    return {
        type: 'SAT_SELECTED',
        payload: satellite
    };
};


