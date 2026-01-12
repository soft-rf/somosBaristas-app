import React from "react";
import styles from "../../styles/CartItem.module.css";
import { useCart } from "../../context/CartContext";

// Formateador para precios en moneda local (ej: $ 16.500)
const formatPrice = (price) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(price);
};

const CartItem = ({ item }) => {
  // Obtenemos las funciones del contexto
  const { addToCart, decreaseQuantity, removeFromCart } = useCart();

  return (
    <div className={styles.cartItem}>
      <img src={item.imageSrc} alt={item.title} className={styles.itemImage} />
      <div className={styles.itemDetails}>
        <p className={styles.itemTitle}>{item.title}</p>
        {item.grind && <p className={styles.itemGrind}>Molienda: {item.grind.replace('-', ' ')}</p>}
        <p className={styles.itemPrice}>{formatPrice(item.price)}</p>
      </div>
      <div className={styles.itemActions}>
        <div className={styles.quantityControl}>
          <button
            className={styles.quantityButton}
            onClick={() => decreaseQuantity(item.id)}
          >
            -
          </button>
          <span className={styles.itemQuantity}>{item.quantity}</span>
          <button
            className={styles.quantityButton}
            onClick={() => addToCart(item)}
          >
            +
          </button>
        </div>
        <p className={styles.itemSubtotal}>
          {formatPrice(item.price * item.quantity)}
        </p>
        <button
          className={styles.removeButton}
          aria-label="Eliminar item"
          onClick={() => removeFromCart(item.id)}
        >
          <img src="/image/trash.svg" alt="Eliminar item" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
