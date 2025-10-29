import React, { createContext, useState, useContext, useEffect } from "react";

// 1. Crear el Contexto
// Este es el que vamos a consumir
const CartContext = createContext();

// 2. Crear el Proveedor del Contexto
// Este es el que envuelve a los componentes y maneja el estado y la lógica
export const CartProvider = ({ children }) => {
  // 1. Inicializamos el estado leyendo desde localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem("cart");
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Could not parse cart data from localStorage", error);
      return [];
    }
  });

  // 2. Usamos useEffect para guardar en localStorage cada vez que cartItems cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Función para añadir productos al carrito
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Buscamos si el producto ya existe en el carrito usando su ID
      const existingItem = prevItems.find((item) => item.id === product.id);

      // Si el producto ya existe...
      if (existingItem) {
        // ...creamos un nuevo array donde actualizamos solo la cantidad de ese producto
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Si el producto no existe, simplemente lo añadimos al final del array con cantidad 1
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Función para disminuir la cantidad o eliminar si es el último
  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productId);

      // Si la cantidad es 1, al disminuir se elimina el producto
      if (existingItem?.quantity === 1) {
        return prevItems.filter((item) => item.id !== productId);
      }

      // Si la cantidad es mayor a 1, solo se resta uno
      return prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  // Función para eliminar productos completamente, sin importar la cantidad
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  // El valor que será accesible por los componentes hijos
  const value = {
    cartItems,
    addToCart,
    decreaseQuantity,
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
