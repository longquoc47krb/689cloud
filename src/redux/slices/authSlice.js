import httpRequest from "../../services/httpRequest";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//login logout
export const login = createAsyncThunk("auth/login", async (user) => {
  try {
    const response = await httpRequest({
      url: "/auth/ip-address-login",
      method: "POST",
      data: user,
    });
    if (response.status === 200) {
      localStorage.setItem("x-access-token", response.data.access_token);
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
export const loginUser = createAsyncThunk("auth/login/user", async (user) => {
  try {
    const response = await httpRequest({
      url: "/auth/ip-address-login",
      method: "POST",
      data: user,
    });
    if (response.status === 200) {
      localStorage.setItem("x-access-token", response.data.access_token);
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
export const getIPAddress = createAsyncThunk("auth/client-ip", async () => {
  try {
    const response = await axios.get("https://geolocation-db.com/json/");
    return response.data;
  } catch (err) {
    return err;
  }
});
const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: userFromStorage,
    loading: false,
    loginStatus: null,
    ip: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("x-access-token");
      state.loginStatus = null;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.loginStatus = action.payload.response;
      if (action.payload.response.status === 200) {
        state.user = action.payload.response.data;
      }
    },
    [login.rejected]: (state) => {
      state.loading = false;
    },
    [loginUser.pending]: (state) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.loginStatus = action.payload.response;
      if (action.payload.response.status === 200) {
        state.user = action.payload.response.data;
        // assign role = 1 ( user)
        state.user = { ...state.user, role_level: 1 };
      }
    },
    [loginUser.rejected]: (state) => {
      state.loading = false;
    },
    [getIPAddress.pending]: (state) => {
      state.loading = true;
    },
    [getIPAddress.rejected]: (state) => {
      state.loading = false;
    },
    [getIPAddress.fulfilled]: (state, action) => {
      state.ip = action.payload.IPv4;
      state.loading = true;
    },
  },
});

export const { logout } = authSlice.actions;
export const userSelector = (state) => state.auth.user;
export const authSelector = (state) => state.auth;
export const loginStatusSelector = (state) => state.auth.loginStatus;
export default authSlice.reducer;
