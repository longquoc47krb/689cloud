import { combineReducers, configureStore } from "@reduxjs/toolkit";
import adminModalSlice from "./slices/adminModalSlice";
import authSlice from "./slices/authSlice";
import groupSlice from "./slices/groupSlice";
import searchBoxSlice from "./slices/searchBoxSlice";
import usergroupSlice from "./slices/usergroupSlice";
import userSlice from "./slices/userSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  group: groupSlice,
  modal: adminModalSlice,
  usergroup: usergroupSlice,
  searchBox: searchBoxSlice,
});
export const store = configureStore({
  reducer: rootReducer,
});
