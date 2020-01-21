export const selectedSatReducer = (selectedSat = null, action) => {
    if (action.type === "SAT_SELECTED") {
        return action.payload
    }

    return selectedSat;
};

export const selectedRecentReducer = (recent = 10, action) => {
    if (action.type === "RECENT_SELECTED") {
        return action.payload
    }

    return recent;
};

export const selectStartDateReducer = (date = new Date(), action) => {
    if (action.type === "START_DATE_SELECTED") {
        return action.payload
    }

    return date;
};

export const selectEndDateReducer = (date = new Date(), action) => {
    if (action.type === "END_DATE_SELECTED") {
        return action.payload
    }

    return date;
};