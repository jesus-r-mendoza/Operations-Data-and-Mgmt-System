import { apiURL } from "../Apis/SatApi";
import Cookies from 'universal-cookie';

const cookie = new Cookies();
export const postFile = (file, desc = "None") => async dispatch => {
    console.log("File", file.name);
    const headers = new Headers();
    const formData = new FormData();
    const authToken = cookie.get('auth');

    headers.append("Authorization", `Token ${authToken}`);
    formData.append("upfile", file);
    formData.append("description", "hello");

    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: formData,
        redirect: 'follow'
    };

    fetch(`${apiURL}files/upload/`, requestOptions)
        .then(response => response.text())
        .then(result => dispatch({type: "FILE_ACCEPTED", payload: result, result: true}))
        .catch(error => dispatch({type: "FILE_ACCEPTED", payload: error, isLoading: false}));
};