export const MOCK_PRODUCTS = [
  {
    id: "peru-250g",
    origen: "Perú - Chanchamayo",
    formato: "250 gramos",
    precioUnitario: 12.5, // Precio en USD o la moneda local
    stockDisponible: 50,
    imagen: "/image/300gr.png", // Usamos una de tus imágenes de mock
  },
  {
    id: "colombia-500g",
    origen: "Colombia - Huila",
    formato: "500 gramos",
    precioUnitario: 22.0,
    stockDisponible: 25,
    imagen: "/image/500gr.png",
  },
  {
    id: "brasil-1000g",
    origen: "Brasil - Minas Gerais",
    formato: "1000 gramos",
    precioUnitario: 40.0,
    stockDisponible: 10,
    imagen: "/image/package-check.svg",
  },
];

/**
 * Función que simula la obtención de un producto por ID.
 * Es necesaria para cuando el usuario hace "Añadir al Carrito"
 */
export const getProductById = (id) => {
  return MOCK_PRODUCTS.find((p) => p.id === id);
};
