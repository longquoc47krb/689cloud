import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpRequest from "../../services/httpRequest";
import { userFromStorage } from "./userSlice";

export const getGroupContent = createAsyncThunk(
  "group/list/content",
  async (domain) => {
    try {
      const response = await httpRequest({
        url: "/content-group/content-group-list",
        method: "GET",
        params: {
          domain: domain,
        },
        headers: {
          "x-access-token": userFromStorage.access_token,
        },
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
export const getGroupContentDetail = createAsyncThunk(
  "group/content/detail",
  async (content_group_id, domain) => {
    try {
      const response = await httpRequest({
        url: "/content-group/content-group-list",
        method: "GET",
        params: {
          content_group_id: content_group_id,
          domain: domain,
          page: 1,
          size: 4,
        },
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
export const currentGroupSlice = createSlice({
  name: "current_group",
  initialState: {
    currentGroup: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGroupContentDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGroupContent.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getGroupContentDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.currentGroup = action.payload.response.data;
      });
  },
});
const groupSlice = createSlice({
  name: "group",
  initialState: {
    groupList: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGroupContent.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGroupContent.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getGroupContent.fulfilled, (state, action) => {
        state.loading = false;
        state.groupList = action.payload.response.data;
      });
  },
});
export const currentGroupSelector = (state) => state.current_group.currentGroup;
export const groupListSelector = (state) => state.group.groupList;
export default groupSlice.reducer;
