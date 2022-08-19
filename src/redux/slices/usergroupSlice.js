import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpRequest from "../../services/httpRequest";

const initialState = {
  data: [],
  filter: null,
  loading: false,
};
//productList
export const getUserGroups = createAsyncThunk(
  "usergroup/getUserGroups",
  async (filter) => {
    const res = await httpRequest({
      url: "/usergroup",
      method: "GET",
      params: {
        name: filter,
      },
    });
    return res;
  }
);
const userGroupSlice = createSlice({
  name: "usergroup",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload.filter;
    },
    removeFilter: (state) => {
      state.filter = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserGroups.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      });
  },
});
export const { setFilter, removeFilter } = userGroupSlice.actions;
export default userGroupSlice.reducer;
