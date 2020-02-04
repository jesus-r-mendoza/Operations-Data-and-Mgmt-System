import SatApi from "../Apis/SatApi";

// Register a new user
export const register = (username, email, pass) => async dispatch => {
    const registerData = new FormData();
    registerData.append("username", username);
    registerData.append("email", email);
    registerData.append("password", pass);

    const response = await SatApi.post("register/", {
        data: registerData
    })
        .catch((function (error) {
            console.log(error)
        }));

    dispatch({type: "REGISTER", payload: response})
};

// Log the user in and obtain an Auth token
export const login = (email, pass) => async dispatch => {
    const loginData = new FormData();
    loginData.append("email", email);
    loginData.append("password", pass);

    const response = await SatApi.post("login/", {
        data: loginData
    })
        .catch(function(error) {
            console.log(error)
        });

    dispatch({type: "LOGIN", payload: response})
};