import axios from 'axios';

const apiURL = "http://localhost:8000/";

export default axios.create({
    baseURL: apiURL
});

export { apiURL }