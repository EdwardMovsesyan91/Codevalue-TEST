import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { useParams } from "react-router";
import { CustomPagination } from "../Pagination/pagination";
import Product from "../Product/product";
import type { RootState } from "../../store/store";
import type { ProductsType } from "../../store/productsSlice";
import "./productList.css";

function ProductList() {
  const products = useSelector((state: RootState) => state.products);
  const searchAndSort = useSelector((state: RootState) => state.searchAndSort);
  const { id: selectedProduct } = useParams();
  const pageSize = 5;
  const [page, setPage] = useState(1);

  const searchedAndSortedProducts = useMemo(() => {
    const q = searchAndSort.searchValue.trim().toLowerCase();
    const filtered = q
      ? products.filter((p) => p.name.toLocaleLowerCase().includes(q))
      : products;
    return [...filtered].sort((a, b) => {
      return searchAndSort.sortBy === "name"
        ? a.name.localeCompare(b.name)
        : Number(b.creationDate) - Number(a.creationDate);
    });
  }, [products, searchAndSort.searchValue, searchAndSort.sortBy]);

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * pageSize;
    return searchedAndSortedProducts.slice(start, start + pageSize);
  }, [searchedAndSortedProducts, page]);

  return (
    <div className="productListContainer">
      <CustomPagination
        totalPages={Math.ceil(searchedAndSortedProducts.length / pageSize)}
        page={page}
        onChange={(p) => {
          setPage(p);
        }}
      />
      {paginatedProducts.map((itemObj: ProductsType) => {
        const { description, id, name, image } = itemObj;

        return (
          <Product
            selected={selectedProduct !== id}
            key={id}
            image={image}
            id={id}
            description={description}
            name={name}
          />
        );
      })}
    </div>
  );
}

export default ProductList;
