// src/components/products/ProductItem.jsx

import React from "react";
import styles from "../../styles/ProductItem.module.css";

// Por ahora, el componente ProductItem recibe props estáticas para el ejemplo.
const ProductItem = ({ title, imageSrc, altText, price, options }) => {
  return (
    <article className={styles.productItem}>
      {/* Usar llaves {} para las rutas de imágenes */}
      <img src={imageSrc} alt={altText} className={styles.productImage} />
      <div className={styles.productDetails}>
        <h3 className={styles.productTitle}>{title}</h3>
        <div className={styles.productOptions}>
          {/* Mapear sobre las opciones o recrearlas estáticamente */}
          {options.map((opt, index) => (
            <div className={styles.optionGroup} key={index}>
              <button
                className={styles.optionButton}
                data-origin={opt.dataOrigin}
              >
                {opt.label}
              </button>
              <button className={styles.addButton} data-product-id={opt.dataId}>
                añadir
              </button>
            </div>
          ))}
        </div>
        {/* Asegúrate de que esta estructura coincida con tu HTML original */}
        <div className={styles.productPrice}>{price}</div>
      </div>
    </article>
  );
};

export default ProductItem;
