import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpRequest from "../../services/httpRequest";

const initialState = {
  data: [],
  filter: null,
  loading: false,
};
//productList
export const getUsers = createAsyncThunk("users/getUsers", async (payload) => {
  const res = await httpRequest({
    url: "/users",
    method: "GET",
    params: {
      ...payload,
    },
  });
  return res;
});
const userSlice = createSlice({
  name: "users",
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
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      });
  },
});
export const { setFilter, removeFilter } = userSlice.actions;
export default userSlice.reducer;
