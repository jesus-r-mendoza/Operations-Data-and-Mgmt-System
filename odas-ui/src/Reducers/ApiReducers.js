export const unitsReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_UNITS':
            return [...state, action.payload];
        default:
            return state;
    }
};

export const componentsReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_COMPS':
            return action.payload;
        case 'SIGNED_OUT':
            return action.payload;
        case 'NO_SAT_SELECTED':
            return action.selected;
        default:
            return state;
    }
};

export const fetchSatellitesReducer = (state = [], action) => {
        switch (action.type) {
        case 'FETCH_SATS':
            return action.payload.satellites;
        case 'FETCH_SATS_FAIL':
            return action.error;
        default:
            return state;
    }
};