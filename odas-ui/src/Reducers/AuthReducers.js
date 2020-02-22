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
        // Message is user info object on success; Status is true
        return {message: action.payload, status: action.payload.data};
    } else if (action.type === 'LOGIN_FAIL') {
        // Message is the error message on failure; Status is false
        return {message: action.payload.response.data.error, status: action.payload.response.data.data};
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

export const createOrgReducer = (orgState = [], action) => {
    if (action.type === "CREATE_ORG") {
        return [...orgState]
    }

    return [...orgState];
};