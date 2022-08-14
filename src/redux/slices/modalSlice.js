import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggle: false,
  isEditting: false,
  selectedData: {},
};
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openAddModal: (state) => {
      state.toggle = true;
      state.isEditting = false;
      state.selectedData = {};
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

export const { openAddModal, openEditModal, resetModal } = modalSlice.actions;
export default modalSlice.reducer;
