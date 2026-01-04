import React, { useState } from "react";
import styles from "../../styles/ProductDetailPopup.module.css";

const ProductDetailPopup = ({ originDetails, onClose }) => {
  const [showImage, setShowImage] = useState(false);

  const handleNextClick = () => {
    setShowImage(true);
  };

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        {!showImage ? (
          <div className={styles.detailsView}>
            <pre className={styles.originText}>{originDetails}</pre>
            <button className={styles.nextButton} onClick={handleNextClick}>
              Ver imagen →
            </button>
          </div>
        ) : (
          <div className={styles.imageView}>
            <p>Próximamente una imagen aquí.</p>
            <button onClick={() => setShowImage(false)}>← Volver</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPopup;
