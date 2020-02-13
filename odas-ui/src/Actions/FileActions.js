import SatApi from "../Apis/SatApi";

export function postFile (file) {
    console.log(file);
    return (dispatch, getState) => {
        dispatch({type: "REQUEST STARTED", isLoading: false});

        SatApi.post("files/upload/", {data: file})
            .then(
                res => dispatch({type: "FILE_ACCEPTED", payload: res}),
                error => dispatch({type: "REQUEST_FAILED", error: error})
            )
    }
}