import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSearchBoxItems: [],
};

const searchBoxSlice = createSlice({
  name: "searchBox",
  initialState,
  reducers: {
    setSelectedSearchBoxItems: (state, action) => {
      state.selectedSearchBoxItems = action.payload;
    },
    increase: (state, action) => {
      const searchBox = state.selectedSearchBoxItems.find(
        (item) => item.key === action.payload
      );
      searchBox.value = searchBox.value + (searchBox.value >= 12 ? 0 : 1);
      //   item.value = item.value + (item.value >= 12 ? 0 : 1);
    },
    decrease: (state, action) => {
      const searchBox = state.selectedSearchBoxItems.find(
        (item) => item.key === action.payload
      );
      searchBox.value = searchBox.value - (searchBox.value > 0 ? 1 : 0);
    },
  },
});

export const { setSelectedSearchBoxItems, increase, decrease } =
  searchBoxSlice.actions;
export const searchFieldsSelector = (state) =>
  state.searchBox.selectedSearchBoxItems;
export default searchBoxSlice.reducer;
