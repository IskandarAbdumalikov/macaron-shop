import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import SinglePage from "./pages/singlePage/SinglePage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product/:id" element={<SinglePage />} />
    </Routes>
  );
};

export default App;
