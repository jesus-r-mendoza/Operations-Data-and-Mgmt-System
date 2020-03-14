import { combineReducers } from 'redux';

// API calls
import {
    componentsReducer,
    fetchSatellitesReducer,
    fetchUnitsReducer
} from "./ApiReducers";

// Queries
import {
    getRecentMeasurementsReducer,
    getMeasurementsByTimeReducer
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
    postFileReducer,
    analyzeFileReducer
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
    fetchSatellites: fetchSatellitesReducer,
    fetchUnits: fetchUnitsReducer,
    components: componentsReducer,

    // Selections
    selectedSat: selectedSatReducer,
    selectRecent: selectedRecentReducer,
    selectStartDate: selectStartDateReducer,
    selectEndDate: selectEndDateReducer,

    // Authentication
    login: loginReducer,
    register: registerReducer,
    logout: logoutReducer,
    createOrg: createOrgReducer,
    joinOrg: joinOrgReducer,

    // Files
    postFile: postFileReducer,
    getFileList: fileListReducer,
    downloadFile: downloadFileReducer,
    deleteFile: deleteFileReducer,
    analyzeFile: analyzeFileReducer,

    // Query
    getRecentMeasurements: getRecentMeasurementsReducer,
    getMeasurementsByTime: getMeasurementsByTimeReducer
});