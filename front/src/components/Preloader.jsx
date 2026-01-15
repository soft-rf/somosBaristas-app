import React, { useEffect, useState } from "react";
import styles from "../styles/Preloader.module.css";
import logo from "/image/logo.svg";

const Preloader = () => {
  const [text, setText] = useState("");
  const fullText = "Para amantes del café de especialidad";

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 20); // Adjust typing speed

    return () => {
      clearInterval(typingInterval);
    };
  }, []);

  return (
    <div className={styles.loadingContainer}>
      <img src={logo} alt="Cargando..." className={styles.loadingLogo} />
      <p className={styles.loadingText}>
        {text}
        <span className={styles.cursor}></span>
      </p>
    </div>
  );
};

export default Preloader;
