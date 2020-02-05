import SatApi from "../Apis/SatApi";
import axios from "axios";

// Register a new user
export const register = (username, email, pass) => async dispatch => {
    const registerData = new FormData();
    registerData.append("username", username);
    registerData.append("email", email);
    registerData.append("pass", pass);

    console.log("Username", registerData.get("username"));
    console.log("Email", registerData.get("email"));
    console.log("Password", registerData.get("pass"));

    const response = await axios({
        method: 'POST',
        url: "http://localhost:8000/register/",
        header: { 'Content-type': 'application/json' },
        data: registerData
    })
        .catch((function (error) {
            console.log(error.error)
        }));

    dispatch({type: "REGISTER", payload: response})
};

// Log the user in and obtain an Auth token
export const login = (email, pass) => async dispatch => {
    const loginData = new FormData();
    loginData.append("email", email);
    loginData.append("password", pass);

    const response = await SatApi.post("login/", {
        header: {
            'Content-type': 'Authentication'
        },
        data: loginData
    })
        .catch(function(error) {
            console.log(error)
        });

    dispatch({type: "LOGIN", payload: response})
};