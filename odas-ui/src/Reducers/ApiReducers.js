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
            console.log(action.payload);
            return [action.payload];
        default:
            return state;
    }
};

export const satelliteReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_SATS':
            return [...state, action.payload];
        default:
            return state;
    }
};

// export const fileReducer = action => {
//     console.log(action.payload);
//     return action.payload
// };