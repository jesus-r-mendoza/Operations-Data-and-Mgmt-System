export const selectSatellite = (satellite) => {
    return {
        type: 'SAT_SELECTED',
        payload: satellite
    };
};

// Store the amount of recent reports to show on report pages
export const selectRecent = (recent) => {
    return {
        type: "RECENT_SELECTED",
        payload: recent
    };
};

// Store the selected date on reports header
export const selectStartDate = (date) => {
    return {
        type: 'START_DATE_SELECTED',
        payload: date
    };
};

export const selectEndDate = (date) => {
    return {
        type: 'END_DATE_SELECTED',
        payload: date
    };
};