import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const baseURL = "http://localhost:8000/api/v1.0/";

const api = axios.create({
    baseURL: baseURL
});

export default api;