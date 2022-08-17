import httpRequest from "../../services/httpRequest";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//login logout
export const login = createAsyncThunk("auth/login", async (user) => {
  try {
    const response = await httpRequest({
      url: "/auth/ip-address-login",
      method: "POST",
      data: user,
    });
    if (response.status === 200) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return { response };
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    return { error };
  }
});
const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
const authSlice = createSlice({
  name: "auth",
  initialState: { user: userFromStorage, loading: false, loginStatus: null },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      state.loginStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.loginStatus = action.payload.response;
        if (action.payload.response.status === 200) {
          state.user = action.payload.response.data;
        }
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export const userSelector = (state) => state.auth.user;
export const loginStatusSelector = (state) => state.auth.loginStatus;
export default authSlice.reducer;
