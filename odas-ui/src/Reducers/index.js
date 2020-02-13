import { combineReducers } from 'redux';

// API calls
import {
    unitsReducer,
    componentsReducer,
    satelliteReducer,
} from "./ApiReducers";

// Queries
import {
    satComponentQueryReducer
} from "./QueryReducers"

// Selection reducers
import {
    selectedRecentReducer,
    selectedSatReducer,
    selectEndDateReducer,
    selectStartDateReducer
} from "./SelectionReducers";

// Files
import {
    postFileReducer
} from "./FileReducers"

// Authentication
import {
    loginReducer,
    registerReducer,
    logoutReducer
} from "./AuthReducers";

export default combineReducers({
    satObjects: satelliteReducer,
    units: unitsReducer,
    components: componentsReducer,
    selectedSat: selectedSatReducer,
    selectRecent: selectedRecentReducer,
    selectStartDate: selectStartDateReducer,
    selectEndDate: selectEndDateReducer,
    satComponentQuery: satComponentQueryReducer,
    login: loginReducer,
    register: registerReducer,
    logout: logoutReducer
});