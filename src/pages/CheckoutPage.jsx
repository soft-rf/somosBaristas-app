import React, { useState } from "react";
import { useCart } from "../context/CartContext"; // Asegúrate de que useCart esté importado
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/CheckoutPage.module.css";

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart(); // 1. Importa la función para limpiar el carrito

  // Estados para manejar los campos del formulario
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [addressClarification, setAddressClarification] = useState("");
  const [preferences, setPreferences] = useState("");
  // Nuevos estados para manejar el flujo de pago
  const [isLoading, setIsLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Cálculos del total (reutilizamos la lógica)
  const shippingCost = 3900;
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + shippingCost;

  // Función que se ejecutará al intentar pagar
  const handlePlaceOrder = () => {
    // 1. Validar que los campos no estén vacíos
    if (!fullName || !email || !phone || !address) {
      alert(
        "Por favor, completa todos los campos obligatorios: Nombre, Email, Teléfono y Dirección."
      );
      return;
    }

    setIsLoading(true);
    // 2. Recopilar la información del pedido
    const orderTimestamp = new Date();
    const orderData = {
      products: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: total,
      customer: {
        fullName,
        email,
        phone,
        address,
        addressClarification,
      },
      preferences,
      timestamp: orderTimestamp.toISOString(),
    };

    // 3. Enviar el pedido al backend
    fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((res) => {
        if (res.ok) {
          // 4. Mostrar la pantalla de confirmación si todo fue bien
          setOrderPlaced(true);
          clearCart(); // 2. Limpia el carrito después de un pedido exitoso
          return res.json();
        }
        // Si el backend responde con un error
        throw new Error("El servidor respondió con un error.");
      })
      .then((data) => {
        console.log("Pedido recibido por el backend:", data);
      })
      .catch((error) => {
        console.error("Error al enviar el pedido:", error);
        alert(
          "Hubo un problema al registrar tu pedido. Por favor, intenta de nuevo."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      {/* Limpiamos los elementos de depuración */}
      <Header />
      <main className={styles.checkoutContainer}>
        {!orderPlaced && (
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
        )}

        <div className={styles.summarySection}>
          {orderPlaced ? (
            <div className={styles.confirmationSection}>
              <h2 className={styles.summaryTitle}>¡Gracias por tu pedido!</h2>
              <p>Tu pedido ha sido registrado con éxito.</p>
              <p>
                Para completar la compra, por favor transfiere el monto total de{" "}
                <strong>
                  {new Intl.NumberFormat("es-AR", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 0,
                  }).format(total)}
                </strong>{" "}
                a la siguiente cuenta:
              </p>
              <div className={styles.paymentDetails}>
                <p>
                  <strong>CBU:</strong> 0000003100055555555555
                </p>
                <p>
                  <strong>Alias:</strong> somos.baristas.ok
                </p>
                <p>
                  <strong>Titular:</strong> Somos Baristas S.A.
                </p>
              </div>
              <p>
                Una vez que realices el pago, envíanos el comprobante a nuestro
                correo electrónico{" "}
                <a href="mailto:pagos@somosbaristas.com">
                  pagos@somosbaristas.com
                </a>{" "}
                junto con tu nombre completo.
              </p>
              <p>
                Recibirás una confirmación por correo electrónico una vez que
                verifiquemos el pago.
              </p>
            </div>
          ) : (
            <>
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

              {cartItems.length > 0 ? (
                <button
                  className={styles.paymentButton}
                  onClick={handlePlaceOrder}
                  disabled={isLoading}
                >
                  {isLoading ? "Procesando..." : "Realizar Pedido"}
                </button>
              ) : (
                <p className={styles.emptyCartMessage}>
                  Tu carrito está vacío.
                </p>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CheckoutPage;
