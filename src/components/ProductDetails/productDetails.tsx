import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import "./ProductDetails.css";
import { useNavigate, useParams } from "react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { upsert, type ProductsType } from "../../store/productsSlice";
import { productSchema } from "./productSchema";
import { ValidationError } from "yup";

const ProductDetails = () => {
  const { id } = useParams();
  const newId = useRef(crypto.randomUUID());
  const dispatch: AppDispatch = useDispatch();
  const navigation = useNavigate();

  const existing = useSelector((state: RootState) => {
    return state.products.find((item) => item.id === id);
  });

  const empty: ProductsType = useMemo(() => {
    const date = new Date().toISOString();
    return {
      id: newId.current,
      name: "",
      description: "",
      price: 0,
      creationDate: date,
      image: "0",
    };
  }, []);

  const [form, setForm] = useState<ProductsType>(existing ?? empty);

  useEffect(() => {
    setForm(id === "new" ? { ...empty } : existing ?? { ...empty });
    if (existing) setForm(existing);
  }, [id, existing, empty]);

  const set = (k: string, v: string | number) => {
    setForm((f) => ({ ...f, [k]: k === "price" ? Number(v) : v }));
  };

  const onSave = async () => {
    try {
      let newId = form.id;
      if (id === "new") {
        newId = crypto.randomUUID();
        form.id = newId;
      }

      await productSchema.validate(form, { abortEarly: false });
      dispatch(upsert(form));
      navigation(`/product/${newId}`);
    } catch (err) {
      if (err instanceof ValidationError) {
        const errors = err.inner.map((e) => {
          return e.message;
        });
        alert(errors);
      }
    }
  };

  return (
    <div className="moreDetailsContainer">
      <div className="moreDetailsInnerContainer">
        <div className="imageContainer" />
        <label>Name</label>
        <input
          onChange={(e) => set("name", e.target.value)}
          value={form?.name}
          type="text"
        />
        <label>Description</label>
        <textarea
          onChange={(e) => set("description", e.target.value)}
          value={form?.description}
        />
        <label>Price</label>
        <input
          className="numberInput"
          onChange={(e) => set("price", e.target.value)}
          value={form?.price}
          type="number"
        />
      </div>

      <button onClick={onSave} style={{ alignSelf: "end" }}>
        Save
      </button>
    </div>
  );
};

export default ProductDetails;
