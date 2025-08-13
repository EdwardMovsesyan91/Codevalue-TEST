import { useRef } from "react";
import "./searchAndSort.css";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { setSearchValue, setSortBy } from "../../store/searchAndSortSlice";
import { Link } from "react-router";

const SearchAndSort = () => {
  const debounce = useRef<number | null>(null);
  const dispatch: AppDispatch = useDispatch();

  const onSearchChange = (e) => {
    if (debounce.current) {
      clearTimeout(debounce.current);
    }
    debounce.current = setTimeout(() => {
      dispatch(setSearchValue(e.target.value));
    }, 500);
  };

  const onSortChange = (e) => dispatch(setSortBy(e.target.value));

  return (
    <div className="searchAndSortContainer">
      <Link to={`/product/new`}>
        <button>+ Add </button>
      </Link>

      <input
        onChange={onSearchChange}
        className="searchInput"
        type="text"
        placeholder="search products"
      />
      <label> Sort by</label>
      <select onChange={onSortChange}>
        <option value={"name"}>Name</option>
        <option value={"date"}>Recently Added</option>
      </select>
    </div>
  );
};

export default SearchAndSort;
