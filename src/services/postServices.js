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
    }
};
export default postServices;