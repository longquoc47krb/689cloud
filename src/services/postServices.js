import axiosClient from "./api/axiosClient";
import queryString from 'query-string';
const postServices = {
    getAll(params) {
        const url = '/posts';
        return axiosClient.get(url, { params });
    },
    getById(id) {
        const url = `/posts?${id}`;
        return axiosClient.get(url);
    },
    getByFilter(page, filter) {
        const parameterPage = queryString.stringify(page)
        const parameterType = queryString.stringify(filter, { skipNull: true, skipEmptyString: true })
        const url = `/posts?${parameterType}&${parameterPage}`;
        console.log('url', url)
        return axiosClient.get(url)
    },
    // add(data) {
    //     const url = '/posts';
    //     return axiosClient.post(url, data);
    // },
    // update(data) {
    //     const url = `/posts/${data.id}`;
    //     return axiosClient.patch(url, data);
    // },
    // addFormData(data) {
    //     const url = '/with-thumbnail/posts';
    //     return axiosClient.post(url, data, { headers: { 'Content-Type': 'multipart/form-data' } });
    // },
    // updateFormData(data) {
    //     const url = `with-thumbnail/posts/${data.get('id')}`;
    //     return axiosClient.patch(url, data, { headers: { 'Content-Type': 'multipart/form-data' } });
    // },
    // remove(id) {
    //     const url = `/posts/${id}`;
    //     return axiosClient.delete(url);
    // },
};
export default postServices;