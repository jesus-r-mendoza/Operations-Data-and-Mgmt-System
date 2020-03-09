export const getRecentMeasurementsReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_RECENTS':
            return action.payload;

        case 'FETCH_RECENTS_FAIL':
            return action.payload;

        case 'FETCHING_RECENTS':
            return action.isLoading;

        default:
            return state;
    }
};
