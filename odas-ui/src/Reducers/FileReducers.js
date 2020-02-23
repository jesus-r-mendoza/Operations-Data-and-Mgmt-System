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
            return false;
    }
};

export const fileListReducer = (fileState = [], action) => {
    switch (action.type) {
        case 'FETCHING_FILES':
            return {files: [], isLoading: action.isLoading};
        case "FILE_LIST":
            return {files: action.payload.data.files, isLoading: action.isLoading};
        case "FILE_LIST_FAIL":
            return {errorMessage: action.payload.response.data.detail, isLoading: action.isLoading};
        default:
            return {files: [], isLoading: action.isLoading};
    }
};