import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartItem from "../components/cart/CartItem";
import styles from "../styles/CartPage.module.css";

const CartPage = () => {
  const { cartItems } = useCart();

  // Calcular cantidad total de productos (unidades)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  // Lógica de envío: Base 2000, Gratis si hay 2 o más productos/unidades
  const shippingCost = totalItems >= 2 ? 0 : 2000;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // El total ahora es la suma del subtotal y el costo de envío
  // Solo se suma el envío si hay productos en el carrito
  const total = cartItems.length > 0 ? subtotal + shippingCost : 0;

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
                  }).format(subtotal)}
                </span>
              </div>
              <div className={styles.summaryRow}>
                <span>Envío</span>
                <span>
                  {shippingCost === 0 ? (
                    <span style={{ color: "#2e7d32", fontWeight: "bold" }}>
                      ¡Gratis!
                    </span>
                  ) : (
                    new Intl.NumberFormat("es-AR", {
                      style: "currency",
                      currency: "ARS",
                      minimumFractionDigits: 0,
                    }).format(shippingCost)
                  )}
                </span>
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
              {/* Convertimos el botón en un Link a la nueva página de checkout */}
              <Link to="/checkout" className={styles.checkoutButton}>
                Iniciar Compra
              </Link>
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
};

export default CartPage;
