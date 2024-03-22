import axios from "axios";
axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_AUTH,
});

export default api;
