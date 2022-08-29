import httpRequest from "../../services/httpRequest";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
export const getProfile = createAsyncThunk("user/profile", async (token) => {
  try {
    const response = await httpRequest({
      url: "/auth/info",
      method: "GET",
    });
    return { response };
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    return { error };
  }
});
export const getProfileFakeUser = createAsyncThunk(
  "user/profile/user",
  async (token) => {
    try {
      const response = await httpRequest({
        url: "/auth/info",
        method: "GET",
      });
      return { response };
    } catch (err) {
      const error =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      return { error };
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    loading: false,
  },
  reducers: {
    clearUserInfo: (state) => {
      state.userInfo = null;
    },
  },
  extraReducers: {
    [getProfile.pending]: (state) => {
      state.loading = true;
    },
    [getProfile.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload.response.data;
    },
    [getProfile.rejected]: (state) => {
      state.loading = false;
    },
    [getProfileFakeUser.pending]: (state) => {
      state.loading = true;
    },
    [getProfileFakeUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload.response.data;
      state.userInfo = { ...state.userInfo, role_level: 1 };
    },
    [getProfileFakeUser.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export const { clearUserInfo } = userSlice.actions;
export const userInfoSelector = (state) => state.user.userInfo;
export default userSlice.reducer;
