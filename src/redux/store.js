import { combineReducers, configureStore } from "@reduxjs/toolkit";
import modalSlice from "./slices/modalSlice";
import usergroupSlice from "./slices/usergroupSlice";
import userSlice from "./slices/userSlice";
const rootReducer = combineReducers({
  modal: modalSlice,
  users: userSlice,
  usergroup: usergroupSlice,
});
export const store = configureStore({
  reducer: rootReducer,
});
