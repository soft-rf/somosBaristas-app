import React, { useState } from "react";
import styles from "../../styles/ProductDetailPopup.module.css";

const ProductDetailPopup = ({ originDetails, onClose, imageSrc, detailImages }) => {
  const images = (detailImages && detailImages.length > 0) ? detailImages : [imageSrc];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        
        <div className={styles.imageContainer}>
          <img src={images[currentImageIndex]} alt="Detalle del producto" className={styles.productImage} />
          {images.length > 1 && (
            <>
              <button onClick={goToPreviousImage} className={`${styles.navButton} ${styles.prevButton}`}>&#10094;</button>
              <button onClick={goToNextImage} className={`${styles.navButton} ${styles.nextButton}`}>&#10095;</button>
            </>
          )}
        </div>

        <div className={styles.detailsView}>
            <pre className={styles.originText}>{originDetails}</pre>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPopup;
