import axios from "axios";
import { getVariables } from "../helpers";

const { VITE_API_URL} = getVariables()

const calendarApi = axios.create({
    baseURL: VITE_API_URL
});

export default calendarApi;