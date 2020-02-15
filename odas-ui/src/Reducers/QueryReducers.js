export const satComponentQueryReducer = (state = [], action) => {
    switch (action.type) {
        case 'QUERY_COMPS':
            return [...state, action.payload];
        default:
            return state;
    }
};
