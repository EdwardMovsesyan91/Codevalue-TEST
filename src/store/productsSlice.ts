import { createSlice } from "@reduxjs/toolkit";
import { mocData } from "./mocData";

export interface ProductsType {
  id: string;
  name: string;
  description: string;
  price: number;
  creationDate: string;
  image: string;
}

const initialState: ProductsType[] = mocData;

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    upsert: (state, action) => {
      const p = action.payload;
      const i = state.findIndex((x) => x.id === p.id);
      if (i === -1) state.push(p);
      else state[i] = { ...state[i], ...p };
    },
    remove: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { upsert, remove } = productSlice.actions;
export default productSlice.reducer;
