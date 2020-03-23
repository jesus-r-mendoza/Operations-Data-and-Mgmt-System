export const getRecentMeasurementsReducer = (recentMeasState = [], action) => {
    switch (action.type) {
        case 'FETCH_RECENTS':
            return action.payload;

        case 'FETCH_RECENTS_FAIL':
            return action.payload;

        case 'FETCHING_RECENTS':
            return action.isLoading;

        default:
            return recentMeasState;
    }
};

export const getMeasurementsByTimeReducer = (measTimeState = [], action) => {
    switch (action.type) {
        case 'FETCH_MEAS_WITH_TIME':
            return action.payload;

        case 'FETCH_MEAS_FAIL':
            return action.payload;

        case 'FETCHING_MEASUREMENTS':
            return action.payload;

        default:
            return measTimeState;
    }
};
