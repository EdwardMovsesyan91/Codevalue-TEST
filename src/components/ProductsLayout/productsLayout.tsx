import { Outlet } from "react-router";
import Header from "../Header/header";
import ProductList from "../ProductList/productList";
import SearchAndSort from "../SearchAndSort/searchAndSort";
import "./ProductsLayout.css";

function ProductsLayout() {
  return (
    <>
      <Header />
      <SearchAndSort />
      <div className="mainContainer">
        <ProductList />
        <Outlet />
      </div>
    </>
  );
}

export default ProductsLayout;
