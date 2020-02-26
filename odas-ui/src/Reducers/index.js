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
    deleteFileReducer,
    downloadFileReducer,
    fileListReducer,
    postFileReducer
} from "./FileReducers"

// Authentication
import {
    loginReducer,
    registerReducer,
    logoutReducer,
    createOrgReducer,
    joinOrgReducer
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
    logout: logoutReducer,
    postFile: postFileReducer,
    createOrg: createOrgReducer,
    getFileList: fileListReducer,
    joinOrg: joinOrgReducer,
    downloadFile: downloadFileReducer,
    deleteFile: deleteFileReducer
});