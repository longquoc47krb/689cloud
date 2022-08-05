import postServices from "../../services/postServices";

export const getPosts = () => {
    return async (dispatch) => {
        const response = await postServices.getPosts();

        dispatch({
            type: 'GET_POSTS',
            data: response
        })
    }
}
export const getPostByFilter = (filter) => {
    return async (dispatch) => {
        const response = await postServices.getPostByFilter(filter);
        dispatch({
            type: 'GET_POST_BY_FILTER',
            data: response
        })
    }
}