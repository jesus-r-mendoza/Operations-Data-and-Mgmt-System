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