import { combineReducers, configureStore } from "@reduxjs/toolkit";
import modalSlice from "./slices/modalSlice";
import userSlice from "./slices/userSlice";
const rootReducer = combineReducers({
  modalToggle: modalSlice,
  users: userSlice,
});
export const store = configureStore({
  reducer: rootReducer,
});
