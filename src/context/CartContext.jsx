import React, { createContext, useState, useContext } from "react";

// 1. Creamos el contexto
const CartContext = createContext();

// 2. Creamos un hook personalizado para usar el contexto más fácilmente
export const useCart = () => {
  return useContext(CartContext);
};

// 3. Creamos el proveedor del contexto
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);
      if (itemExists) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  // ¡Aquí está la función que faltaba!
  const clearCart = () => {
    setCartItems([]);
  };

  // 4. Pasamos los valores y funciones al proveedor
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart, // La añadimos aquí para que esté disponible en todo el app
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
