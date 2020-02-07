export const loginReducer = (loginState = [], action) => {
    if (action.type === "LOGIN") {
        return [...loginState, action.payload]
    }

    return loginState;
};

export const registerReducer = (registerState = [], action) => {
    if (action.type === "REGISTER") {
        return [...registerState, action.payload]
    }

    return registerState;
};