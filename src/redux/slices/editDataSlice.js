import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editData: {
    email: {
      temp: "",
      value: "example@689cloud.com",
      disabled: true,
    },
  },
};
const editDataSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    setEditData: (state, action) => {
      state.editData = action.payload;
      console.log("payload", action.payload);
    },
    setEditEmail: (state, action) => {
      state.editData.email = action.payload;
      console.log("email payload", action.payload);
    },
  },
});
export const { setEditData } = editDataSlice.actions;
export default editDataSlice.reducer;
