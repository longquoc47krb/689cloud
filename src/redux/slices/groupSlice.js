import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpRequest from "../../services/httpRequest";
import { userFromStorage } from "./userSlice";

export const getGroupContent = createAsyncThunk(
  "group/list",
  async (params, thunkAPI) => {
    const { token, domain } = params;
    try {
      const response = await httpRequest({
        url: "/content-group/content-group-list",
        method: "GET",
        params: {
          domain: domain,
        },
        headers: {
          "x-access-token": token ?? userFromStorage.access_token,
        },
      });
      return { response };
    } catch (err) {
      const error =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getSelectedGroupContent = createAsyncThunk(
  "group/detail",
  async (params, thunkAPI) => {
    const { token, id, domain } = params;
    try {
      const response = await httpRequest({
        url: "/content/public/page",
        method: "GET",
        params: {
          content_group_id: id,
          domain: domain,
          page: 1,
          size: 4,
        },
        headers: {
          "x-access-token": token ?? userFromStorage.access_token,
        },
      });
      return { response };
    } catch (err) {
      const error =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const groupSlice = createSlice({
  name: "group",
  initialState: {
    groupList: null,
    loading: false,
    selectedGroup: null,
    toggle: false,
  },
  reducers: {
    closeModal: (state) => {
      state.selectedGroup = null;
      state.toggle = false;
    },
  },
  extraReducers: {
    [getGroupContent.pending]: (state) => {
      state.loading = true;
    },
    [getGroupContent.rejected]: (state) => {
      state.loading = false;
    },
    [getGroupContent.fulfilled]: (state, action) => {
      state.loading = false;
      state.groupList = action.payload.response.data;
    },
    [getSelectedGroupContent.pending]: (state) => {
      state.loading = true;
      state.toggle = true;
    },
    [getSelectedGroupContent.rejected]: (state) => {
      state.loading = false;
      state.toggle = false;
    },
    [getSelectedGroupContent.fulfilled]: (state, action) => {
      state.loading = false;
      state.toggle = true;
      state.selectedGroup = action.payload.response.data.content;
    },
  },
});

export const selectedGroupSelector = (state) => state.group.selectedGroup;
export const groupListSelector = (state) => state.group.groupList;
export const groupSelector = (state) => state.group;
export const { closeModal } = groupSlice.actions;
export default groupSlice.reducer;
