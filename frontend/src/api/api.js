import axios from "axios";

const baseURL = "http://localhost:8000/api/v1.0/";

const api = axios.create({
    baseURL: baseURL
});

export default api;