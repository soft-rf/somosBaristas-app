import React, { useState } from "react";

import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import MenuPopup from "./MenuPopup";
import styles from "../styles/Header.module.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // 1. Usamos el hook para acceder a los items del carrito
  const { cartItems } = useCart();

  // 2. Calculamos la cantidad total de items sumando las cantidades de cada producto.
  // El método reduce() es perfecto para esto.
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const toggleMenu = () => {
    document.body.style.overflow = isMenuOpen ? "auto" : "hidden";
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerGroupLeft}>
        <button
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="main-menu"
        >
          &#9776;
        </button>
        {/* Usamos Link para navegar a la ruta principal / */}
        <Link to="/" className={styles.headerLogo} aria-label="Inicio">
          <img
            src="/image/logo.svg"
            alt="somos baristas logo"
            className={styles.logoSvg}
          />
        </Link>
      </div>

      <div className={styles.headerGroupRight}>
        {/* 
        <div className={styles.headerUser}>
          <span className={styles.headerUserIcon}>
            <img src="/image/user.svg" alt="user icon" />
          </span>
          <span className={styles.headerUserName}>Hola! Usuario</span>
        </div>
        */}
        {/* Usamos Link para el carrito, apuntando temporalmente a una ruta que crearemos más adelante */}
        <Link to="/cart" className={styles.headerCart} aria-label="Ver carrito">
          <span className={styles.headerCartIcon}>
            <img src="/image/package-check.svg" alt="check icon" />
          </span>
          <span className={styles.headerCartCount}>{totalItems}</span>
        </Link>
      </div>

      {/* 💥 5. Renderizado condicional del MenuPopup */}
      {/* Solo se muestra si isMenuOpen es true. Le pasamos toggleMenu como prop onClose */}
      {isMenuOpen && <MenuPopup onClose={toggleMenu} />}
    </header>
  );
};

export default Header;
