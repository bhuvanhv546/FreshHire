import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<h1>Home Working</h1>} />
      </Routes>
    </>
  );
}

export default App;