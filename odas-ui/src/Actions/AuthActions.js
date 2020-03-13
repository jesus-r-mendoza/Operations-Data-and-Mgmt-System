import axios from "axios";
import { apiURL } from "../Definitions/SatApi";
import { authToken } from "../Definitions/BrowserCookie";

// Register a new user
export const register = (username, email, pass, inviteCode = '') => async dispatch => {
    const registerData = new FormData();

    registerData.append("username", username);
    registerData.append("email", email);
    registerData.append("pass", pass);

    console.log("Username", registerData.get("username"));
    console.log("Email", registerData.get("email"));
    console.log("Password", registerData.get("pass"));

    // Making the invite code an optional input
    if (inviteCode.length > 0) {
        registerData.append("code", inviteCode);
        console.log("Invite", registerData.get("code"));
    }

    await axios({
        method: 'POST',
        url: `${apiURL}register/`,
        header: {'Content-type': 'application/json'},
        data: registerData
    })
        .then(response => dispatch({ type: "REGISTER_SUCCESS", payload: response.data.username }))
        .catch(error => dispatch({ type: "REGISTER_FAIL", payload: error.response.data.error }))
};

// Log the user in and obtain an Auth token
export const login = (username, pass) => async dispatch => {
    dispatch({type: "LOGGING_IN", isLoading: true});

    const loginData = new FormData();

    loginData.append("username", username);
    loginData.append("pass", pass);

    console.log("Username", loginData.get("username"));
    console.log("Password", loginData.get("pass"));

    await axios({
        method: 'POST',
        url: `${apiURL}login/`,
        header: { 'Content-type': 'application/json' },
        data: loginData
    })
        .then(response => dispatch({ type: "LOGIN_SUCCESS", payload: response.data, isLoading: false }))
        .catch(error => dispatch({ type: "LOGIN_FAIL", payload: error, isLoading: false }))
};

// Log the user out using the Auth token
export const logout = () => async dispatch => {
    dispatch({type: "LOGGING_OUT", isLoading: true});

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Token ${authToken}`);

    const requestOptions = {
        method: 'DELETE',
        headers: myHeaders
    };

    fetch(`${apiURL}logout/`, requestOptions)
        .then(result => result.json())
        .then(response => dispatch({type: 'LOGOUT', payload: response, isLoading: false}))
        .catch(error => dispatch({type: 'LOGOUT_FAIL', payload: error, isLoading: false}));
};

export const createOrg = (orgName='testorg') => async dispatch => {
    const headers = new Headers();
    const orgForm = new FormData();

    headers.append("Authorization", `Token ${authToken}`);

    orgForm.append("org_name", orgName);

    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: orgForm,
        redirect: 'follow'
    };

    await fetch(`${apiURL}create-org/`, requestOptions)
        .then(res => res.json())
        .then(response => dispatch({type: "CREATE_ORG", payload: response}))
        .catch(error => dispatch({type: "ORG_FAIL", payload: error}))
};

export const joinOrg = inviteCode => async dispatch => {
    const myHeaders = new Headers();
    const orgData = new FormData();

    myHeaders.append("Authorization", `Token ${authToken}`);
    orgData.append("code", inviteCode);

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: orgData,
        redirect: 'follow'
    };

    fetch(`${apiURL}join/`, requestOptions)
        .then(result => result.json())
        .then(response => dispatch({type: 'JOIN_ORG', payload: response}))
        .catch(error => dispatch({type: 'JOIN_ORG_FAIL', payload: error}));
};