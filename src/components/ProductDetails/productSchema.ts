import * as yup from "yup";

export const productSchema = yup.object({
  id: yup.string().required(),
  name: yup.string().max(30, "Name must be at most 30 chars").required(),
  description: yup.string().max(200, "Description must be at most 200 chars"),
  price: yup
    .number()
    .typeError("Price myst be a number")
    .positive("Price must be bigger then 0")
    .required(),
});
