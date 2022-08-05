const initailState = {
    posts: [],
    filterPosts: []
}

export const PostReducer = (state = initailState, action) => {
    switch (action.type) {
        case 'GET_POSTS': {
            return { ...state, posts: action.data };
        }
        case 'GET_POST_BY_FILTER': {
            return { ...state, filterPosts: action.data };
        }
        default: return { ...state };
    }
}