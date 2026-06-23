import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Auth/Login";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;