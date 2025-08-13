import "./product.css";
import type { ProductProps } from "./productProps";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store"; // Import types
import { remove } from "../../store/productsSlice";
import { Link } from "react-router";

function Product(props: ProductProps) {
  const { selected, description, name, id } = props;

  const dispatch: AppDispatch = useDispatch();

  const onDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (confirm(`You are going to remove product "${name}" are you sure?`)) {
      dispatch(remove(id));
    }
  };

  return (
    <Link
      to={`/product/${id}`}
      className="productContainer"
      style={{ backgroundColor: selected ? "inherit" : "lightBlue" }}
    >
      <div className="leftSectionContainer">
        <div className="image" />
        <div className="descriptionContainer">
          <span className="name">{name}</span>
          <span className="description"> {description}</span>
        </div>
      </div>
      <button
        type="button"
        onClick={onDeleteClick}
        className="deleteButton"
        style={{ height: "18px" }}
      >
        Delete
      </button>
    </Link>
  );
}

export default Product;
