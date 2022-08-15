import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./index.css";

export function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}
