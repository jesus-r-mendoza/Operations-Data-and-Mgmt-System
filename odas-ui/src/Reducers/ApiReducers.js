export const fetchUnitsReducer = (state = [], action) => {
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
            return {data: action.payload, isLoading: action.isLoading};

        case 'SIGNED_OUT':
            return {data: action.payload, isLoading: action.isLoading};

        case 'FETCHING_COMPONENTS':
            return {data: [], isLoading: action.isLoading};

        default:
            return {data: [], isLoading: action.isLoading};
    }
};

export const fetchSatellitesReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_SATS':
            return action.payload;

        case 'FETCH_SATS_FAIL':
            return {error: true, message: action.message};

        default:
            return state;
    }
};