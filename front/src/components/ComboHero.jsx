import React from "react";
import styles from "../styles/ComboHero.module.css";

const ComboHero = () => {
  return (
    <section className={styles.comboHero}>
      <p className={styles.comboHeroInfo}>
        Con la compra de dos 1/4 o mas envio gratis y puntos a favor de
        descuento para tu proxima compra
      </p>
    </section>
  );
};

export default ComboHero;
