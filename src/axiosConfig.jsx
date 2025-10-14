// src/axiosConfig.js
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000"; // your backend
axios.defaults.withCredentials = true;             // send cookies automatically

export default axios;
