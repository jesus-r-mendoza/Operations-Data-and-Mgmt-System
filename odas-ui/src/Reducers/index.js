import { combineReducers } from 'redux';

const satelliteReducer = () => {
    return [
        {id: 1, name: 'Hubble'},
        {id: 2, name: 'Saturn V'},
        {id: 3, name: 'Pic Sat'}
    ]
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