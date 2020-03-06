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
            return [...state, action.payload];
        case 'SIGNED_OUT':
            return action.payload;
        default:
            return state;
    }
};

export const fetchSatellitesReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_SATS':
            return action.payload;
        case 'FETCH_SATS_FAIL':
            return action.error;
        default:
            return state;
    }
};

// export const fileReducer = action => {
//     console.log(action.payload);
//     return action.payload
// };