export const MOCK_PRODUCTS = [
  {
    id: "peru-250g",
    origen: "Perú - Chanchamayo",
    name: "Café en Grano 250gr",
    formato: "250 gramos",
    precioUnitario: 23500,
    stockDisponible: 50,
    imagen: "/image/granos_café.jpg",
    description: `Origen: Perú - Chanchamayo
Varietal: Blend
Beneficio: Natural / Lavado
Notas: Chocolate, nueces, frutos rojos`,
  },
  {
    id: "colombia-500g",
    origen: "Colombia - Huila",
    name: "Café en Grano 500gr",
    formato: "500 gramos",
    precioUnitario: 43200,
    stockDisponible: 25,
    imagen: "/image/granos_café.jpg",
    description: `Origen: Colombia - Huila
Varietal: Blend
Beneficio: Natural / Lavado
Notas: Chocolate, nueces, frutos rojos`,
  },
  {
    id: "brasil-1000g",
    origen: "Brasil - Minas Gerais",
    name: "Café en Grano 1kg",
    formato: "1000 gramos",
    precioUnitario: 76500,
    stockDisponible: 10,
    imagen: "/image/granos_café.jpg",
    description: `Origen: Brasil - Minas Gerais
Varietal: Blend
Beneficio: Natural / Lavado
Notas: Chocolate, nueces, frutos rojos`,
  },
  {
    id: "molino-manual",
    name: "Molino Manual",
    origen: "Accesorio",
    formato: "Unitario",
    precioUnitario: 116000,
    stockDisponible: 15,
    imagen: "/image/molino-manual.png",
    detailImages: [
      "/image/molino-manual.png",
      "URL_DE_IMAGEN_2_AQUI",
      "URL_DE_IMAGEN_3_AQUI",
    ],
    description: `Molino de café manual de acero inoxidable de alta calidad con mango de patrón de rejilla texturizado - Diseño ergonómico para uso en casa y en la oficina, no requiere electricidad, duradero y fácil de limpiar.
Muelas de metal, mantenimiento simple. 
Muy bueno para moliendas desde espresso hasta prensa francesa.`,
  },
  {
    id: "cafetera-filtro",
    name: "Cafetera de Filtro",
    origen: "Accesorio",
    formato: "Unitario",
    precioUnitario: 29200,
    stockDisponible: 20,
    imagen: "/image/cafetera-filtro.png",
    detailImages: [
      "/image/cafetera-filtro.png",
      "URL_DE_IMAGEN_2_AQUI",
      "URL_DE_IMAGEN_3_AQUI",
    ],
    description: 'Cafetera de filtro para preparar café de alta calidad, destacando los sabores y aromas únicos de cada grano. Ideal para los amantes del café que aprecian un ritual de preparación.',
  },
  {
    id: "balanza",
    name: "Balanza",
    origen: "Accesorio",
    formato: "Unitario",
    precioUnitario: 64300,
    stockDisponible: 30,
    imagen: "/image/balanza.png",
    detailImages: [
      "/image/balanza.png",
      "URL_DE_IMAGEN_2_AQUI",
      "URL_DE_IMAGEN_3_AQUI",
    ],
    description: 'Balanza de precisión para baristas, con cronómetro integrado. Permite pesar con exactitud los granos de café y controlar el tiempo de extracción para un resultado perfecto.',
  },
];

/**
 * Función que simula la obtención de un producto por ID.
 * Es necesaria para cuando el usuario hace "Añadir al Carrito"
 */
export const getProductById = (id) => {
  return MOCK_PRODUCTS.find((p) => p.id === id);
};