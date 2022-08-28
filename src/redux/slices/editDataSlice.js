import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editData: {
    email: {
      temp: "",
      value: "example@689cloud.com",
    },
  },
};
const editDataSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    setEditData: (state, action) => {
      state.editData = action.payload;
      console.log("action.payload", action.payload);
    },
  },
});
export const { setEditData } = editDataSlice.actions;
export default editDataSlice.reducer;
