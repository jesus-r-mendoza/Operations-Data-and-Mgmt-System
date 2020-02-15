import SatApi from "../Apis/SatApi";

// Get all components that are related to the selected satellite
export const satCompQuery = satID => async dispatch => {
    const response = await SatApi.get(`api/sat/${satID}/comp`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        }
    });

    dispatch({type: 'QUERY_COMPS', payload: response.data});
};