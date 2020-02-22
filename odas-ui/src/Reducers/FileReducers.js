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
    if (action.type === "FILE_LIST") {
       return action.payload;
    }

    return [...fileState, action.payload]
};