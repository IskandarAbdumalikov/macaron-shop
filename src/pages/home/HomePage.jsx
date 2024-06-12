import React from "react";
import Header from "../../components/layout/header/Header";
import Hero from "../../components/hero/Hero";
import Products from "../../components/products/Products";
import Footer from "../../components/layout/footer/Footer";

const HomePage = () => {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Products />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
