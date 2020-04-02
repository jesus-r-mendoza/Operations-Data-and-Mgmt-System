import {authToken} from "../Definitions/BrowserCookie";

export const postFileReducer = (fileState = [], action) => {
    switch (action.type) {
        case 'REQUEST_STARTED':
            // console.log("File loading", action.result);
            return action.isLoading;

        case 'FILE_ACCEPTED':
            return action.payload;

        case 'FILE_FAILED':
            return false;

        default:
            return fileState;
    }
};

export const fileListReducer = (fileState = [], action) => {
    switch (action.type) {
        case 'FETCHING_FILES':
            return {files: [], isLoading: action.isLoading};

        case "FILE_LIST":
            return {files: action.payload, isLoading: action.isLoading};

        case "FILE_LIST_FAIL":
            if (authToken) {
                return {files: [], errorMessage: action.payload.response.data.detail, isLoading: action.isLoading};
            } else {
                return {files: [], errorMessage: 'Something went wrong', isLoading: false}
            }

        default:
            return {files: fileState.files || []}
    }
};
export const downloadFileReducer = (downloadState = [], action) => {
    let download = require('js-file-download');

    switch (action.type) {
        case 'FILE_DOWN':
            download(action.payload.data, action.fileName);
            return action.payload;

        case 'FILE_DOWN_ERROR':
            return action.payload;

        default:
            return [...downloadState];
    }
};

// TODO do something with these responses
export const deleteFileReducer = (deleteState = [], action) => {
    switch (action.type) {
        case 'FILE_DELETE':
            return deleteState;

        case 'FILE_DELETE_FAIL':
            return deleteState;

        default:
            return deleteState;
    }
};

export const analyzeFileReducer = (analyzeState = [], action) => {
    switch (action.type) {
        case 'ANALYZE_FILE':
            return action.payload;

        case 'ANALYZE_FILE_FAIL':
            return action.payload;

        default:
            return analyzeState;
    }
};