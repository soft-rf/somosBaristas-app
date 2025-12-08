import React from "react";
import styles from "../styles/ComboHero.module.css";

const ComboHero = () => {
  return (
    <section className={styles.comboHero}>
      <div className={styles.comboSlider}>
        <div className={`${styles.comboSlide} ${styles.active}`}>
          <div className={styles.comboSlideContent}>
            <h2 className={styles.comboHeroTitle}>
              Combo 300GR + Molino manual
            </h2>
            <div className={styles.comboHeroPrice}>$ 89.500</div>
          </div>
        </div>
      </div>

      <div className={styles.comboHeroPagination}>
        <span className={`${styles.dot} ${styles.active}`}></span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
      </div>

      <p className={styles.comboHeroInfo}>
        Todos nuestros productos incluyen filtros gratis
      </p>
    </section>
  );
};

export default ComboHero;
