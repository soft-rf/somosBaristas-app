import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/CheckoutPage.module.css";

const CheckoutPage = () => {
  const { cartItems } = useCart();

  // Estados para manejar los campos del formulario
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [addressClarification, setAddressClarification] = useState("");
  const [preferences, setPreferences] = useState("");

  // Cálculos del total (reutilizamos la lógica)
  const shippingCost = 3900;
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + shippingCost;

  // Función que se ejecutará al intentar pagar
  const handleProcessPayment = () => {
    // 1. Validar que los campos no estén vacíos (lógica a futuro)
    if (!fullName || !email || !phone || !address) {
      alert(
        "Por favor, completa todos los campos obligatorios: Nombre, Email, Teléfono y Dirección."
      );
      return;
    }

    // 2. Recopilar toda la información del pedido
    const orderData = {
      customer: {
        fullName,
        email,
        phone,
        address,
        addressClarification,
      },
      items: cartItems,
      totals: {
        subtotal,
        shippingCost,
        total,
      },
      preferences,
      timestamp: new Date().toISOString(),
    };

    console.log("Procesando pago con la siguiente información:", orderData);

    // 3. Lógica de integración con Mercado Pago (siguiente paso)
    // Aquí es donde llamaríamos a nuestro backend para crear una "preferencia de pago"
    // y luego redirigir al usuario o mostrar el checkout de Mercado Pago.
    alert(
      "Redirigiendo a Mercado Pago... (Simulación)\nRevisa la consola para ver los datos del pedido."
    );
  };

  return (
    <>
      <Header />
      <main className={styles.checkoutContainer}>
        <div className={styles.formSection}>
          <h1 className={styles.title}>Finalizar Compra</h1>

          <div className={styles.formGroup}>
            <label htmlFor="fullName">Nombre completo</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone">Número de teléfono</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="address">Dirección de envío</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="addressClarification">
              Aclaración de la dirección (piso, depto, etc.)
            </label>
            <input
              type="text"
              id="addressClarification"
              value={addressClarification}
              onChange={(e) => setAddressClarification(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="preferences">Preferencias de tu compra</label>
            <textarea
              id="preferences"
              placeholder="Detalla por favor tus preferencias, cafe molido o no, si es molido para que tipo de método (V60, espresso, moka, filtro, etc...)"
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className={styles.summarySection}>
          <h2 className={styles.summaryTitle}>Resumen del pedido</h2>
          {/* Aquí podríamos mappear los items del carrito de forma simplificada */}
          <div className={styles.summaryRow}>
            <span>Subtotal:</span>
            <span>
              {new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS",
                minimumFractionDigits: 0,
              }).format(subtotal)}
            </span>
          </div>
          <div className={styles.summaryRow}>
            <span>Envío:</span>
            <span>
              {new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS",
                minimumFractionDigits: 0,
              }).format(shippingCost)}
            </span>
          </div>
          <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
            <span>Total:</span>
            <span>
              {new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS",
                minimumFractionDigits: 0,
              }).format(total)}
            </span>
          </div>

          <button
            className={styles.paymentButton}
            onClick={handleProcessPayment}
          >
            <img src="/image/mercado-pago.svg" alt="Mercado Pago" />
            Pagar con Mercado Pago
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CheckoutPage;
