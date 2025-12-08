import React from "react";
import Header from "../components/Header";
import ComboHero from "../components/ComboHero";
import ProductList from "../components/products/ProductList";
import Footer from "../components/Footer";
import styles from "../styles/HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.ecommerce}>
      <Header />
      <main>
        <ComboHero />
        <ProductList />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
