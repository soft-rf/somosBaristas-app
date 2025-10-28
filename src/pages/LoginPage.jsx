import React from "react";
import styles from "../styles/LoginPage.module.css";

const LoginPage = () => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginLogo}>
        <h1 className={styles.loginLogoText}>
          somos <br />
          Baristas
        </h1>
      </div>

      <div className={styles.loginPrompt}>
        <p>Crear una cuenta o iniciar sesión</p>
        <br />
        <div className={styles.loginPromptLines}>
          <hr className={styles.lineaFina} />
          <hr className={styles.lineaFina} />
        </div>
      </div>

      <div className={styles.loginSocial}>
        <a
          href="/login"
          className={`${styles.loginButton} ${styles.loginButtonGoogle}`}
          aria-label="Continuar con Google"
        >
          <img
            src="/image/google-logo.svg"
            alt="Logo de Google"
            className={styles.googleIcon}
          />
          Continuar con Google
        </a>
      </div>

      <div className={styles.loginLegal}>
        <p>
          Al hacer clic en continuar, aceptas nuestros
          <a href="/terminos-de-servicio" className={styles.loginLink}>
            Términos de Servicio
          </a>
          y nuestra
          <a href="/politica-de-privacidad" className={styles.loginLink}>
            Política de Privacidad
          </a>
        </p>
      </div>
    </div>
  );
};
export default LoginPage;
