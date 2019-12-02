import { combineReducers } from 'redux';

const unitsReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_UNITS':
            return [...state, action.payload];
        default:
            return state;
    }
};

const componentsReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_COMPS':
            return [...state, action.payload];
        default:
            return state;
    }
};

const satelliteReducer = (state = [], action) => {
    switch (action.type) {
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

    return selectedSat;
};

const selectedRecentReducer = (recent = 10, action) => {
    if (action.type === "RECENT_SELECTED") {
        return action.payload
    }

    return recent;
};

const selectStartDateReducer = (date = new Date(), action) => {
    if (action.type === "START_DATE_SELECTED") {
        return action.payload
    }

    return date;
};

const selectEndDateReducer = (date = new Date(), action) => {
    if (action.type === "END_DATE_SELECTED") {
        return action.payload
    }

    return date;
};

export default combineReducers({
    satObjects: satelliteReducer,
    units: unitsReducer,
    components: componentsReducer,
    selectedSat: selectedSatReducer,
    selectRecent: selectedRecentReducer,
    selectStartDate: selectStartDateReducer,
    selectEndDate: selectEndDateReducer
});