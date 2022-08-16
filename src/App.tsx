import "./index.scss";

import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Products from "./pages/products";
import ProductDetails from "./pages/product-details";

export function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/items" element={<Products />} />
          <Route path="/items/:id" element={<ProductDetails />} />
        </Route>
      </Routes>
    </main>
  );
}
