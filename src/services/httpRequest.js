import axiosClient from "./api/axiosClient";
const httpRequest = {
    get(url, params) {
        return axiosClient.get(url, { params });
    },
    post(url, data) {
        return axiosClient.post(url, data);
    },
    patch(url, data) {
        return axiosClient.patch(url, data);
    },
    delete(url) {
        return axiosClient.delete(url);
    }
};
export default httpRequest;