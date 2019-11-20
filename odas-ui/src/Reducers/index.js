import { combineReducers } from 'redux';

const satelliteReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_UNITS':
            return [...state, action.payload];
        case 'FETCH_COMPS':
            return [...state, action.payload];
        case 'FETCH_SATS':
            return [...state, action.payload];
        default:
            return state;
    }
};

const selectedSatReducer = (selectedSat = null, action) => {
    if (action.type === "SAT_SELECTED") {
        return action.payload
    }

    return selectedSat
};

export default combineReducers({
   sats: satelliteReducer,
   selectedSat: selectedSatReducer
});