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

// const fileReducer = action => {
//     console.log(action.payload);
//     return action.payload
// };

const selectedSatReducer = (selectedSat = null, action) => {
    if (action.type === "SAT_SELECTED") {
        return action.payload
    }

    return selectedSat
};



export default combineReducers({
    // file: fileReducer,
    sats: satelliteReducer,
    selectedSat: selectedSatReducer,
});