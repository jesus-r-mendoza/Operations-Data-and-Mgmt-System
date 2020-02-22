import { apiURL } from "../Definitions/SatApi";
import Cookies from 'universal-cookie';
import axios from 'axios';

const cookie = new Cookies();
export const postFile = (file, desc = "None") => async dispatch => {
    console.log("File", file.name);
    const headers = new Headers();
    const formData = new FormData();
    const authToken = cookie.get('auth');

    headers.append("Authorization", `Token ${authToken}`);
    formData.append("upfile", file);
    formData.append("description", desc);

    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: formData,
        redirect: 'follow'
    };

    axios.post(`${apiURL}files/upload/`, requestOptions)
        .then(response => response.json())
        .then(result => dispatch({type: "FILE_ACCEPTED", payload: result}))
        .catch(error => dispatch({type: "FILE_FAILED", payload: error}));
};