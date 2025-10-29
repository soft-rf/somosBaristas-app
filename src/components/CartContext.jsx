import React, { createContext, useState, useContext } from "react";

// 1. Crear el Contexto
// Este es el que vamos a consumir
const CartContext = createContext();

// 2. Crear el Proveedor del Contexto
// Este es el que envuelve a los componentes y maneja el estado y la lógica
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Función para añadir productos al carrito
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // 1. Buscamos si el producto ya existe en el carrito usando su ID
      const existingItem = prevItems.find((item) => item.id === product.id);

      // 2. Si el producto ya existe...
      if (existingItem) {
        // ...creamos un nuevo array donde actualizamos solo la cantidad de ese producto
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // 3. Si el producto no existe, simplemente lo añadimos al final del array
      return [...prevItems, product];
    });
  };

  // Función para eliminar productos (la implementaremos después)
  const removeFromCart = (productId) => {
    console.log("Eliminando del carrito:", productId);
  };

  // El valor que será accesible por los componentes hijos
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// 3. Crear el Hook personalizado para usar el contexto
// Esto simplifica el uso del contexto en otros componentes
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};
