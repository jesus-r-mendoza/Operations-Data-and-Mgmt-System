import SatApi, { apiURL } from "../Definitions/SatApi";
import {authToken} from "../Definitions/BrowserCookie";

export const postFile = (file, desc = "None") => async dispatch => {
    console.log("File", file.name);
    const headers = new Headers();
    const formData = new FormData();

    headers.append("Authorization", `Token ${authToken}`);
    formData.append("upfile", file);
    formData.append("description", desc);

    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: formData,
        redirect: 'follow'
    };

    fetch(`${apiURL}files/upload/`, requestOptions)
        .then(response => response.json())
        .then(result => dispatch({type: "FILE_ACCEPTED", payload: result}))
        .catch(error => dispatch({type: "FILE_FAILED", payload: error}));
};

export const getFileList = () => async dispatch => {
    dispatch({type: "FETCHING_FILES", isLoading: true});

    const response = await SatApi.get('filelist/', {
        headers: {
            'Authorization': `Token ${authToken}`
        }
    });

       dispatch({type: "FILE_LIST", payload: response, isLoading: false})
        // .catch(error => dispatch({type: "FILE_LIST_FAIL", payload: error, isLoading: false}))
};