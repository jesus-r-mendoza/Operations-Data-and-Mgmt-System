export const postFileReducer = (fileState = [], action) => {
    switch (action.type) {
        case 'REQUEST_STARTED':
            return action.isLoading;

        case 'FILE_ACCEPTED':
            return true;

        case 'FILE_FAILED':
            return true;

        default:
            return false;
    }
};