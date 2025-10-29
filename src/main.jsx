import App from "./App.jsx";
import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
import { CartProvider } from "./context/CartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
