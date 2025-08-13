import { createSlice } from "@reduxjs/toolkit";

type SortByType = "name" | "date";

export interface SearchAndSort {
  searchValue: string;
  sortBy: SortByType;
}

const initialState: SearchAndSort = { searchValue: "", sortBy: "name" };

const searchAndSort = createSlice({
  name: "searchAndSort",
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setSearchValue, setSortBy } = searchAndSort.actions;
export default searchAndSort.reducer;
