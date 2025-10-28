import React, { useState } from "react";

import { Link } from "react-router-dom";
import MenuPopup from "./MenuPopup";
import styles from "../styles/Header.module.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          somos <br />
          Baristas
        </Link>
      </div>

      <div className={styles.headerGroupRight}>
        {/* Usamos Link para navegar a la ruta de Login /login */}
        <Link to="/login" className={styles.headerUser}>
          <span className={styles.headerUserIcon}>
            <img src="/image/user.svg" alt="user icon" />
          </span>
          <span className={styles.headerUserName}>Hola! Usuario</span>
        </Link>
        {/* Usamos Link para el carrito, apuntando temporalmente a una ruta que crearemos más adelante */}
        <Link to="/cart" className={styles.headerCart} aria-label="Ver carrito">
          <span className={styles.headerCartIcon}>
            <img src="/image/package-check.svg" alt="check icon" />
          </span>
          <span className={styles.headerCartCount}>0</span>
        </Link>
      </div>

      {/* 💥 5. Renderizado condicional del MenuPopup */}
      {/* Solo se muestra si isMenuOpen es true. Le pasamos toggleMenu como prop onClose */}
      {isMenuOpen && <MenuPopup onClose={toggleMenu} />}
    </header>
  );
};

export default Header;
