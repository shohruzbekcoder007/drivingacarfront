import axios from "axios";
import { host } from "./API_urls"

axios.defaults.headers.common['x-auth-token'] = sessionStorage.getItem("x-auth-token");

const instance = axios.create({
  baseURL: host + '/v1/',
});

export default instance;

// {
//   headers: {
//     "x-auth-token": sessionStorage.getItem("x-auth-token"),
//   },
// }