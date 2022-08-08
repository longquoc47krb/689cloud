import axios from "axios";
import { REACT_APP_PIXABAY_API, REACT_APP_PIXABAY_KEY } from "../constants";
const axiosClient = axios.create({
  baseURL: REACT_APP_PIXABAY_API,
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    key: REACT_APP_PIXABAY_KEY,
    image_type: "photo",
    orientation: "vertical",
    per_page: 20,
  },
});
// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (!error.response) throw new Error("Network error ");
    if (error.response.status === 401) {
      // clear token logout
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
