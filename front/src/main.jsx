import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx"; // Importa el proveedor
import "./index.css";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        {" "}
        {/* Envuelve la App con el proveedor del carrito */}
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
