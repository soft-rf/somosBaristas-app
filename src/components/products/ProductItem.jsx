// src/components/products/ProductItem.jsx

import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import styles from "../../styles/ProductItem.module.css";

// El componente ahora recibe todas las propiedades del producto gracias al spread operator
const ProductItem = ({ id, title, imageSrc, altText, price, options }) => {
  // 1. Usamos el hook para acceder a la función addToCart
  const { addToCart } = useCart();
  // Estado para mostrar el mensaje de confirmación
  const [showConfirmation, setShowConfirmation] = useState(false);

  // 2. Creamos un manejador para el clic
  const handleAddToCart = (option) => {
    // Creamos un objeto de producto específico para el carrito
    const productToAdd = {
      id: option.dataId, // ID único de la variante (ej: 'c300-peru')
      title: `${title} - ${option.label}`, // Título combinado (ej: 'En grano x 300gr - Perú')
      price: parseFloat(price.replace("$", "").replace(".", "")), // Convertimos el precio a número
      imageSrc,
      quantity: 1, // Siempre añadimos 1 al principio
    };
    addToCart(productToAdd);

    // Mostramos el mensaje de confirmación
    setShowConfirmation(true);
    // Y lo ocultamos después de 1.5 segundos
    setTimeout(() => {
      setShowConfirmation(false);
    }, 900);
  };

  return (
    <article className={styles.productItem}>
      <img src={imageSrc} alt={altText} className={styles.productImage} />
      <div className={styles.productDetails}>
        <h3 className={styles.productTitle}>{title}</h3>
        <div className={styles.productOptions}>
          {options.map((option) => (
            <div className={styles.optionGroup} key={option.dataId}>
              <button
                className={styles.optionButton}
                data-origin={option.dataOrigin}
              >
                {option.label}
              </button>
              {/* 3. Asociamos el manejador al evento onClick */}
              <button
                className={styles.addButton}
                onClick={() => handleAddToCart(option)}
              >
                añadir
              </button>
            </div>
          ))}
        </div>
        {/* Mensaje de confirmación que se muestra condicionalmente */}
        {showConfirmation && (
          <div className={styles.confirmationMessage}>
            ✓ Agregado al carrito
          </div>
        )}
        <div className={styles.productPrice}>{price}</div>
      </div>
    </article>
  );
};

export default ProductItem;
