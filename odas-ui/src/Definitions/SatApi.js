import axios from 'axios';

// This endpoint will work when running the ODAS on local host,
// using the default_public_config settings for the backend.
const apiURL = "http://localhost:8080/";

// const apiURL = 'http://ecst-csproj2.calstatela.edu:6338/';
// const apiURL = 'http://localhost:8000/';

// Can be used for generic API calls such as get requests
export default axios.create({
    baseURL: apiURL
});

// Can be used when configuration needs to be specific
// e.g. for some POST requests
export { apiURL }