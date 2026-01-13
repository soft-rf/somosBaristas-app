import React from "react";
import styles from "../styles/ComboHero.module.css";

const ComboHero = () => {
  const handleBlogLinkClick = (e) => {
    e.preventDefault();
    alert(
      "estamos trabajando en esta seccion, pero la idea es una guía simple sobre metodos de preparacion y recetas del café para que encuentres la que mas te guste y apartir de ahi hacer vos tus propios experimentos"
    );
  };

  return (
    <section className={styles.comboHero}>
      <div className={styles.comboHeroInfo}>
        <div className={styles.infoSection}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.infoIcon}
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
          <a href="#" className={styles.blogLink} onClick={handleBlogLinkClick}>
            Aprende a preparar tu café
          </a>
        </div>
        <div className={styles.separator}></div>
        <div className={styles.infoSection}>
          <p className={styles.shippingOffer}>
            a partir de 2 productos <strong>envíos gratis</strong>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ComboHero;
