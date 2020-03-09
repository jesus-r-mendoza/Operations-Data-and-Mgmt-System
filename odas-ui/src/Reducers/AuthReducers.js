import {cookie} from "../Definitions/BrowserCookie";

export const loginReducer = (loginState = [], action) => {
    switch (action.type) {
        // On success the user's auth token will be stored in cookies with max age of 15 minutes
        case 'LOGIN_SUCCESS':
            cookie.addChangeListener(
                function() {
                    console.log("COOKIE CHANGE");
                }
            );

            cookie.set("auth", action.payload.token);
            cookie.set('username', action.payload.username);
            cookie.set('org', action.payload.organization);
            cookie.set('invCode', action.payload.code);
         // Message is user info object on success; Status is true
         return {message: action.payload, status: action.payload.data};

        case 'LOGIN_FAIL':
            // Message is the error message on failure; Status is false
            if (action.payload.response) {
                return {message: action.payload.response.data.error, status: action.payload.response.data.data};
            } else {
                // Prevents the front end from crashing if there is no backend server
                return {message: "Something went wrong", status: false}
            }

        default:
            return [...loginState]
    }
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
        cookie.remove('username');
        cookie.remove('org');
        cookie.remove('invCode');

        return action.payload;
    }

    return logoutState;
};

export const createOrgReducer = (orgState = [], action) => {
    switch (action.type) {
        case "CREATE_ORG":
            return action.payload;

        case "ORG_FAIL":
            return action.payload;

        default:
            return [...orgState];
    }
};

export const joinOrgReducer = (orgState = [], action) => {
    switch (action.type) {
        case 'JOIN_ORG':
            return action.payload;

        case 'JOIN_ORG_FAIL':
            return action.payload;

        default:
            return orgState;
    }
};