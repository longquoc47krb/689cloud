import { applyMiddleware, combineReducers, createStore } from "redux";
import reduxThunk from 'redux-thunk';
import { PostReducer } from "./reducers/post.reducers";

const rootReducer = combineReducers({
    PostReducer: PostReducer
});

export const store = createStore(rootReducer, applyMiddleware(reduxThunk));