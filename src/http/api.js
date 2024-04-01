import axios from "axios";
axios.defaults.withCredentials = true;

const api = axios.create({
  //baseURL: import.meta.env.VITE_BASE_AUTH,
  baseURL: "http://192.168.100.139:8000"
});

export default api;
