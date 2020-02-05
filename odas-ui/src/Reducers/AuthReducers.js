export const login = (loginState = [], action) => {
    if (action.type === "LOGIN") {
        return action.payload
    }

    return loginState;
};

export const register = (registerState = [], action) => {
    if (action.type === "REGISTER") {
        return action.payload
    }

    return registerState;
};