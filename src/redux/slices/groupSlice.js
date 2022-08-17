import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpRequest from "../../services/httpRequest";
import { userFromStorage } from "./userSlice";

export const getGroupContent = createAsyncThunk(
  "group/list",
  async (params, thunkAPI) => {
    const { domain } = params;
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
export const selectedGroupSelector = (state) => state.group.selectedGroup;
export const groupListSelector = (state) => state.group.groupList;
export default groupSlice.reducer;
