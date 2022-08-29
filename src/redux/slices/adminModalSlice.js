import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggle: false,
  isEditting: false,
  selectedData: {
    email: "example@689cloud.com",
  },
};
const adminModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openAddModal: (state) => {
      state.toggle = true;
      state.isEditting = false;
      state.selectedData = {};
    },
    setSelectedData: (state, action) => {
      state.selectedData = action.payload;
    },
    openEditModal: (state, action) => {
      state.toggle = true;
      state.isEditting = true;
      state.selectedData = action.payload.selectedData;
    },
    resetModal: (state) => {
      state.toggle = false;
      state.isEditting = false;
      state.selectedData = {};
    },
  },
});

export const { openAddModal, openEditModal, resetModal } =
  adminModalSlice.actions;
export default adminModalSlice.reducer;
