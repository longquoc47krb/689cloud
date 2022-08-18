import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import groupSlice from "./slices/groupSlice";
import userSlice from "./slices/userSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  group: groupSlice,
});
export const store = configureStore({
  reducer: rootReducer,
});
