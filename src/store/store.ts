import { configureStore } from "@reduxjs/toolkit";
import ProductsReducer from "./productsSlice";
import SearchAndSortReducer from "./searchAndSortSlice";
import { mocData } from "./mocData";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("products");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    localStorage.setItem("products", JSON.stringify(state.products));
  } catch {
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    products: ProductsReducer,
    searchAndSort: SearchAndSortReducer,
  },
  preloadedState: {
    products: loadState() ?? mocData,
  },
});

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
