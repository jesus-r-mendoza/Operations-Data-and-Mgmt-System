import Cookie from 'universal-cookie';

export const loginReducer = (loginState = [], action) => {
    if (action.type === 'LOGIN_SUCCESS') {
        // On success the user's auth token will be stored in cookies with max age of 15 minutes
        const cookie = new Cookie();

        cookie.set("auth", action.payload.token, {
            maxAge: 900
        });

        return [...loginState, action.payload];
    } else if (action.type === 'LOGIN_FAIL') {

        return [...loginState, action.payload];
    }


    return loginState;
};

export const registerReducer = (registerState = [], action) => {
    if (action.type === "REGISTER") {
        return [...registerState, action.payload]
    }

    return registerState;
};