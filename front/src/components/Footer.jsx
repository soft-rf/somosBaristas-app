import React from "react";
import {
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Contacto</h4>
            <a href="#" className="footer-link contact-link">
              <FaWhatsapp />
              <span>WhatsApp</span>
            </a>
            <a href="#" className="footer-link contact-link">
              <FaEnvelope />
              <span>Email</span>
            </a>
          </div>
          <div className="footer-section">
            <h4>Ayuda</h4>
            <a href="/faq" className="footer-link">
              Preguntas Frecuentes
            </a>
            <a href="/terminos" className="footer-link">
              Términos y Condiciones
            </a>
            <a href="/privacidad" className="footer-link">
              Política de Privacidad
            </a>
          </div>
          <div className="footer-section">
            <h4>Síguenos</h4>
            <div className="social-icons">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <FaInstagram />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <FaFacebook />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <FaTiktok />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Somos Baristas. Todos los derechos
            reservados.
          </p>
          <a
            href="https://portafolio-rodrigo-rabanal.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Desarrollado por Rodrigo Dev
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
