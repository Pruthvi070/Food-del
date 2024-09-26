/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PalceOrder from "./pages/PalceOrder/PalceOrder";
import Footer from "./components/Footer/Footer";
const App = () => {
  return (
    <>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ Cart" element={<Cart />} />
          <Route path="/ Order" element={<PalceOrder />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
