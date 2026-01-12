import React, { useState, useMemo } from "react";
import { useCart } from "../../context/CartContext";
import styles from "../../styles/ProductItem.module.css";
import ProductDetailPopup from "./ProductDetailPopup";
import { getProductById } from "../../data/productMocks";

const ProductItem = ({
  title,
  imageSrc,
  altText,
  options,
  isAvailable = true,
}) => {
  const { addToCart } = useCart();
  const [showConfirmation, setShowConfirmation] = useState(null); // Store the ID of the confirmed product
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupDetails, setPopupDetails] = useState('');
  const [grind, setGrind] = useState('en-grano');

  // Check if the product is coffee to apply the watermark
  const isCoffee = title.toLowerCase().includes('café');

  // Enrich options with full product details for easier access
  const optionsWithDetails = useMemo(() => {
    return options.map(option => {
      const productDetails = getProductById(option.dataId);
      // Return a new object combining option and productDetails
      return { ...option, ...productDetails };
    });
  }, [options]);

  const handleAddToCart = (product) => {
    if (!product) return;
    const productToAdd = {
      id: product.id,
      title: `${title} - ${product.formato}`,
      price: product.precioUnitario,
      imageSrc,
      quantity: 1,
      grind: isCoffee ? grind : null,
    };
    addToCart(productToAdd);
    setShowConfirmation(product.id); // Show confirmation for this specific product
    setTimeout(() => setShowConfirmation(null), 900);
  };

  const openPopup = (details) => {
    setPopupDetails(details);
    setIsPopupOpen(true);
  };
  const closePopup = () => setIsPopupOpen(false);

  return (
    <article className={styles.productItem}>
      <div className={styles.productImageContainer}>
        <img src={imageSrc} alt={altText} className={styles.productImage} />
        {isCoffee && <span className={styles.imageWatermark}>verdadera calidad</span>}
      </div>
      <div className={styles.productDetails}>
        <h3 className={styles.productTitle}>{title}</h3>
        <div className={styles.productOptions}>
          {optionsWithDetails.map((product) => (
            <div className={styles.optionContainer} key={product.id}>
              <div className={styles.optionGroup}>
                <button
                  className={styles.optionButton}
                  data-origin={product.origen}
                >
                  {product.formato}
                </button>

                {isAvailable && isCoffee && (
                  <>
                    <select name="grinding" id="grinding" className="grinding-select" onChange={(e) => setGrind(e.target.value)}>
                      <option value="en-grano">En grano</option>
                      <option value="espresso">Espresso - Fino</option>
                      <option value="aeropress">Aero press - No tan fino</option>
                      <option value="v60">V60 - Medio</option>
                      <option value="chemex">Chemex - un poco más que medio</option>
                      <option value="prensa">Prensa - grueso</option>
                    </select>
                    <button className={styles.detailButton} onClick={() => openPopup(product.description)}>
                      Ver detalle
                    </button>
                  </>
                )}

                {isAvailable && !isCoffee && (
                  <button className={styles.detailButton} onClick={() => openPopup(product.description)}>
                    Ver detalle
                  </button>
                )}

                <button
                  className={styles.addButton}
                  onClick={() => handleAddToCart(product)}
                  disabled={!isAvailable || product.stockDisponible === 0}
                >
                  {isAvailable && product.stockDisponible > 0 ? "añadir" : "próximamente"}
                </button>
              </div>
              {isAvailable && (
                <div className={styles.optionPrice}>
                    <span style={{ marginRight: '8px', verticalAlign: 'middle' }}>🇦🇷</span>
                    <span style={{ verticalAlign: 'middle' }}>$ {product.precioUnitario.toLocaleString("es-AR")}</span>
                </div>
              )}
               {showConfirmation === product.id && (
                <div className={styles.confirmationMessage}>
                  ✓ Agregado
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {isPopupOpen && (
        <ProductDetailPopup
          originDetails={popupDetails}
          onClose={closePopup}
          isCoffee={isCoffee}
          imageSrc={imageSrc}
          detailImages={!isCoffee && optionsWithDetails.length > 0 ? optionsWithDetails[0].detailImages : null}
        />
      )}
    </article>
  );
};

export default ProductItem;
