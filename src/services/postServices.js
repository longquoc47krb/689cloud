import { httpRequest } from "./api/httpRequest";

const postServices = {

    getPosts(params) {
        const url = `/posts`;
        return httpRequest.get(url, params);
    },
    getPostByFilter(filter) {
        const paramsString = queryString.stringify(filter, { skipNull: true, skipEmptyString: true });
        const url = `/posts/${paramsString}`;
        return httpRequest.get(url, paramsString);
    }
}
export default postServices;