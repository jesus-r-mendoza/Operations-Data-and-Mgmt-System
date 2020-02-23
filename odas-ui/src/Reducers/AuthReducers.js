import Cookie from 'universal-cookie';

const cookie = new Cookie();
export const loginReducer = (loginState = [], action) => {
    if (action.type === 'LOGIN_SUCCESS') {
        // On success the user's auth token will be stored in cookies with max age of 15 minutes

        cookie.addChangeListener(
            function() {
                console.log("COOKIE CHANGE");
            }
        );

        cookie.set("auth", action.payload.token);

        return [...loginState, action.payload.data];
    } else if (action.type === 'LOGIN_FAIL') {

        return [...loginState, action.payload.response.data.data];
    }


    return loginState;
};

export const registerReducer = (registerState = [], action) => {
    if (action.type === "REGISTER_SUCCESS" || action.type === "REGISTER_FAIL") {
        return {status: action.status, message: action.payload}
    }

    return registerState;
};

export const logoutReducer = (logoutState = [], action) => {
    if (action.type === "LOGOUT") {
        cookie.remove('auth');

        return [...logoutState, action.payload];
    }

    return logoutState;
};