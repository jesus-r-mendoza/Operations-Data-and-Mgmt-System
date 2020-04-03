import axios from 'axios';

// const apiURL = "http://localhost:8080/";
const apiURL = 'http://ecst-csproj2.calstatela.edu:6338/';

// Can be used for generic API calls such as get requests
export default axios.create({
    baseURL: apiURL
});

// Can be used when configuration needs to be specific
// e.g. for some POST requests
export { apiURL }