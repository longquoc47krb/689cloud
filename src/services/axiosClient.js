import axios from "axios";
const axiosClient = axios.create({
  baseURL: "https://dev-api.689cloud.com/urss-be-dev/api/v1/",
  headers: {
    "Content-Type": "application/json",
    "x-access-token": localStorage.getItem("x-access-token"),
  },
});
// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    config.headers = {
      "x-access-token": localStorage.getItem("x-access-token"),
      "Content-type": "application/json",
    };
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
    const { data, status } = error.response;
    if (
      (status === 401 || status === 403) &&
      data.message === "Unauthorized or Access Token is expired"
    ) {
      axiosClient.defaults.headers.common["x-access-token"] =
        localStorage.getItem("x-access-token");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
