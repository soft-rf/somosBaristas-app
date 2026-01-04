import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import styles from "../../styles/ProductItem.module.css";
import ProductDetailPopup from "./ProductDetailPopup"; // Importar el popup

// Texto de ejemplo para los detalles del origen
const originDetailsText = `Origen: Perú
Región: Amazonas
Varietal: Blend
Beneficio: Natural
Altura: 1600 metros
Finca: Timbuyacu
Notas organolépticas: Pasas de uva, chocolate blanco, arándanos

Este Blend de beneficio natural proviene de la finca Timbuyacu, en la región de Amazonas, cultivado a 1600 metros de altura. Su fragancia es intensa y envolvente, con matices dulces que recuerdan a pasas de uva, chocolate blanco y frutos. En taza, se expresa con un cuerpo almibarado y una acidez delicada que realza su perfil frutal. Los sabores a arándanos y pasas se combinan con la cremosidad del chocolate blanco, ofreciendo una experiencia rica y compleja. El retrogusto es prolongado, jugoso y balanceado. Un café dulce y sofisticado, ideal para quienes buscan una taza con carácter frutal y goloso.`;

const ProductItem = ({
  id,
  title,
  imageSrc,
  altText,
  price,
  options,
  isAvailable = true,
}) => {
  const { addToCart } = useCart();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Estado para el popup

  const handleAddToCart = (option) => {
    const productToAdd = {
      id: option.dataId,
      title: `${title} - ${option.label}`,
      price: parseFloat(price.replace(/[\$\.]/g, "")),
      imageSrc,
      quantity: 1,
    };
    addToCart(productToAdd);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 900);
  };

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

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

              {isAvailable && (
                <button className={styles.detailButton} onClick={openPopup}>
                  Ver detalle
                </button>
              )}

              <button
                className={styles.addButton}
                onClick={() => handleAddToCart(option)}
                disabled={!isAvailable}
              >
                {isAvailable ? "añadir" : "próximamente"}
              </button>
            </div>
          ))}
        </div>
        {showConfirmation && (
          <div className={styles.confirmationMessage}>
            ✓ Agregado al carrito
          </div>
        )}
        {isAvailable && <div className={styles.productPrice}>{price}</div>}
      </div>

      {isPopupOpen && (
        <ProductDetailPopup
          originDetails={originDetailsText}
          onClose={closePopup}
        />
      )}
    </article>
  );
};

export default ProductItem;
