import { combineReducers } from 'redux';
import {
    unitsReducer,
    componentsReducer,
    satelliteReducer
} from "./ApiReducers";

import {
    selectedRecentReducer,
    selectedSatReducer,
    selectEndDateReducer,
    selectStartDateReducer
} from "./SelectionReducers";

export default combineReducers({
    satObjects: satelliteReducer,
    units: unitsReducer,
    components: componentsReducer,
    selectedSat: selectedSatReducer,
    selectRecent: selectedRecentReducer,
    selectStartDate: selectStartDateReducer,
    selectEndDate: selectEndDateReducer
});