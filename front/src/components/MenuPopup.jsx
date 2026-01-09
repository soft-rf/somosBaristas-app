import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/MenuPopup.module.css";

// Componente para un solo enlace que puede tener un desplegable o texto
const MenuContentItem = ({ link, handleClose }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const contentRef = useRef(null);

  // Los botones que tienen contenido desplegable (texto o sub-enlaces)
  return (
    <li className={`${styles.menuItem} ${styles.menuItemDropdown}`}>
      <button
        className={`${styles.menuLink} ${styles.menuLinkDropdownToggle}`}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        aria-expanded={isDropdownOpen}
      >
        {link.name}
        <span
          className={`${styles.dropdownIcon} ${
            isDropdownOpen ? styles.open : ""
          }`}
        >
          &#9660;
        </span>
      </button>

      {/* Contenido desplegable (puede ser texto o lista de enlaces) */}
      <div
        className={styles.submenuWrapper}
        // 💥 La altura se calcula dinámicamente.
        style={{
          maxHeight: isDropdownOpen
            ? `${contentRef.current.scrollHeight}px`
            : "0",
        }}
      >
        <div className={styles.submenuContent} ref={contentRef}>
          {/* Caso 1: Si tiene sublinks (ej. Contacto) */}
          {link.sublinks && (
            <ul className={styles.submenuList}>
              {link.sublinks.map((sublink) => (
                <li key={sublink.name} className={styles.submenuItem}>
                  {/* Usamos <a> ya que estos links van a apps externas o email, NO a rutas de React Router */}
                  <a
                    href={sublink.path}
                    className={styles.submenuLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleClose}
                  >
                    {sublink.name}
                  </a>
                </li>
              ))}
            </ul>
          )}

          {/* Caso 2: Si tiene texto informativo (ej. Qué Hacemos, Quiénes Somos) */}
          {link.infoText && (
            <p className={styles.menuInfoText}>{link.infoText}</p>
          )}
        </div>
      </div>
    </li>
  );
};

// El componente principal del menú
const MenuPopup = ({ onClose }) => {
  // Definición de los enlaces según tus nuevas reglas
  const menuLinks = [
    {
      name: "Qué Hacemos",
      path: "/about", // No es necesario el path si no navega, pero lo mantenemos para consistencia
      infoText:
        "Somos tu aliado en el mundo del café de especialidad. Facilitamos la venta y distribución de productos de alta calidad para llevar la mejor experiencia a la taza de cada cliente. Nos enfocamos en la sostenibilidad y el trato directo con productores.",
    },
    {
      name: "Quiénes Somos",
      path: "/us",
      infoText:
        "Nuestra pasión es redefinir el café. Creemos que cada taza es una oportunidad para educar y deleitar. Trabajamos para enseñarte a disfrutar del buen café, desde el origen hasta la preparación perfecta en tu hogar.",
    },
    {
      name: "Contacto",
      path: "/contact",
      sublinks: [
        { name: "WhatsApp", path: "https://wa.me/5491112345678" }, // Reemplaza con tu número real
        {
          name: "Correo Electrónico",
          path: "mailto:contacto@somosbaristas.com",
        },
        // Aquí irán futuras redes sociales
      ],
    },
  ];

  // Lógica de animación y cierre (la misma que antes)
  const [animationClass, setAnimationClass] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      // Usamos el nombre de clase del módulo
      setAnimationClass("is-open");
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    document.body.style.overflow = "auto"; // Restaurar el scroll al cerrar
    setAnimationClass(""); // Limpiamos la clase
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div className={styles.menuPopupOverlay} onClick={handleClose}>
      <nav
        className={`${styles.menuPopupContent} ${
          animationClass ? styles.isOpen : ""
        }`}
        id="main-menu"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.menuHeader}>
          {/* Agregamos el logo de la marca en el menú (opcional) */}
          <img
            src="/image/logo.svg"
            alt="somos Baristas"
            className={styles.menuBrandTitle}
          />
          <button
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Cerrar Menú"
          >
            &times;
          </button>
        </div>

        <ul className={styles.menuList}>
          {menuLinks.map((link) => (
            <MenuContentItem
              key={link.name}
              link={link}
              handleClose={handleClose}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MenuPopup;
