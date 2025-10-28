import React from "react";
import styles from "../styles/ComboHero.module.css";

const ComboHero = () => {
  return (
    <section className="combo-hero">
      <div className="combo-slider">
        <div className="combo-slide active">
          <div className="combo-slide-content">
            <h2 className="combo-hero-title">Combo 300GR + Molino manual</h2>
            <div className="combo-hero-price">$ 89.500</div>
          </div>
        </div>
      </div>

      <div className="combo-hero-pagination">
        <span className="dot active"></span>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>

      <p className="combo-hero-info">
        Todos nuestros productos incluyen filtros gratis
      </p>
    </section>
  );
};

export default ComboHero;
