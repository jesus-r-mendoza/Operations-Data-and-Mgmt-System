import Cookie from 'universal-cookie';

export const loginReducer = (loginState = [], action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            const cookie = new Cookie();

            cookie.set("auth", action.payload.token, {
                maxAge: 900
            });
            return [...loginState, action.payload.status];
        case 'LOGIN_FAIL':
            return [...loginState, "ERROR: Could not log in"];
        default:
            return loginState;
    }
};

export const registerReducer = (registerState = [], action) => {
    if (action.type === "REGISTER") {
        return [...registerState, action.payload]
    }

    return registerState;
};