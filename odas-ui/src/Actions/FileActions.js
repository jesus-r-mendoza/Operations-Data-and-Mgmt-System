import { apiURL } from "../Apis/SatApi";
import axios from 'axios';
import Cookies from 'universal-cookie';

// TODO needs user auth now I think
export const postFile = (file, desc = "None")=> async dispatch => {
    let cookie = new Cookies();
    let errorMessage = '';
    let fileFd = new FormData();
    const authToken = cookie.get('auth');

    fileFd.append("upfile", file);
    fileFd.append("description", desc);

    console.log(fileFd.get("upfile"));
    console.log(fileFd.get("description"));

    // const response = dispatch({type: "REQUEST STARTED", isLoading: true});

    const response = await axios({
        method: 'POST',
        url: `${apiURL}files/upload/`,
        header: {
            'Content-type': 'multipart/from-data',
            'Authorization': `Token ${authToken}`
        },
        data: fileFd
    })
        .catch(function (error) {
            errorMessage = error
        });

    if (errorMessage === '') {
        console.log(response);
        dispatch({type: "FILE_ACCEPTED", payload: response, isLoading: false});
    } else {
        console.log(errorMessage);
        dispatch({type: "FILE_FAILED", payload: errorMessage, isLoading: false})
    }

};