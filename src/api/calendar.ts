import axios from "axios";
import { getVariables } from "../helpers";

const { VITE_API_URL } = getVariables()

const calendarApi = axios.create({
    baseURL: VITE_API_URL
});

calendarApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['x-token'] = token;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default calendarApi;