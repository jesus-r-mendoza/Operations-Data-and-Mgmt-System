import Satellites from "../Apis/Satellites"

export const fetchUnits = async () => {
    const response = await Satellites.get("/apis/units");

    return {
        type: "FETCH_UNITS",
        payload: response
    };
};

export const selectSatellite = (satellite) => {
    return {
        type: 'SAT_SELECTED',
        payload: satellite
    };
};


