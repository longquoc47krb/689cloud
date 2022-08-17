import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import groupSlice, { currentGroupSlice } from "./slices/groupSlice";
import userSlice from "./slices/userSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  group: groupSlice,
  current_group: currentGroupSlice,
});
export const store = configureStore({
  reducer: rootReducer,
});
