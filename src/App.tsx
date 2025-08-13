import "./App.css";
import ProductDetails from "./components/ProductDetails/productDetails";
import { createBrowserRouter, RouterProvider } from "react-router";
import ProductsLayout from "./components/ProductsLayout/productsLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductsLayout />,
    children: [
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
    ],
  },
  { path: "*", element: <div>Not Found</div> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
