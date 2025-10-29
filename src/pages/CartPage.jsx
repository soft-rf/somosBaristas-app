import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartItem from "../components/cart/CartItem";
import styles from "../styles/CartPage.module.css";

const CartPage = () => {
  const { cartItems } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Header />
      <main className={styles.cartContainer}>
        <h1 className={styles.cartTitle}>Tu Carrito</h1>
        {cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <p>Tu carrito está vacío.</p>
            <Link to="/" className={styles.continueShopping}>
              Seguir comprando
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.cartItemsList}>
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            <div className={styles.cartSummary}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>
                  {new Intl.NumberFormat("es-AR", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 0,
                  }).format(total)}
                </span>
              </div>
              <div className={styles.summaryRow}>
                <span>Envío</span>
                <span>A calcular</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                <span>Total</span>
                <span>
                  {new Intl.NumberFormat("es-AR", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 0,
                  }).format(total)}
                </span>
              </div>
              <button className={styles.checkoutButton}>Iniciar Compra</button>
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
};

export default CartPage;
