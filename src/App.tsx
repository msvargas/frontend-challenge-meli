import "./index.scss";

import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Products from "./pages/products";

export function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/items" element={<Products />} />
        </Route>
      </Routes>
    </>
  );
}
