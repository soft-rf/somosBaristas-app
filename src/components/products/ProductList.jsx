// src/components/products/ProductList.jsx

import React from "react";
import styles from "../../styles/ProductList.module.css";
import ProductItem from "./ProductItem";

// Define los datos de los 4 productos (Hardcodeado por ahora)
const productData = [
  {
    id: "prod-1",
    title: "En grano x 300gr",
    imageSrc: "/image/300gr.png", // La ruta debe coincidir con public/image/
    altText: "Bolsa de café en grano de 300 gramos",
    price: "$ 16.500",
    options: [
      { label: "Perú", dataOrigin: "peru", dataId: "c300-peru" },
      { label: "Brasil", dataOrigin: "brasil", dataId: "c300-brasil" },
      { label: "Colombia", dataOrigin: "colombia", dataId: "c300-colombia" },
    ],
  },
  {
    id: "prod-2",
    title: "En grano x 500gr",
    imageSrc: "/image/500gr.png",
    altText: "Bolsa de café en grano de 500 gramos",
    price: "$ 26.300",
    options: [
      { label: "Perú", dataOrigin: "peru", dataId: "c500-peru" },
      { label: "Brasil", dataOrigin: "brasil", dataId: "c500-brasil" },
      { label: "Colombia", dataOrigin: "colombia", dataId: "c500-colombia" },
    ],
  },
  {
    id: "prod-3",
    title: "MOLINOS MANUALES",
    imageSrc: "/image/molino-manual.png",
    altText: "Molino manual de café",
    price: "$ 79.500",
    // Las opciones singulares (molino y balanza) se manejan con un array de 1
    options: [
      {
        label: "Semi - profesional",
        dataOrigin: "semi",
        dataId: "molino-semi",
      },
    ],
  },
  {
    id: "prod-4",
    title: "Balanza",
    imageSrc: "/image/balanza.png",
    altText: "Balanza digital con cronómetro",
    price: "$ 50.000",
    options: [
      {
        label: "Semi - profesional",
        dataOrigin: "semi",
        dataId: "balanza-semi",
      },
    ],
  },
];

const ProductList = () => {
  return (
    <section className={styles.productList}>
      {/* Mapeamos los datos para crear una ProductItem por cada producto */}
      {productData.map((product) => (
        <ProductItem
          key={product.id} // Usar un ID único en lugar del índice
          title={product.title}
          imageSrc={product.imageSrc}
          altText={product.altText}
          price={product.price}
          options={product.options}
        />
      ))}
    </section>
  );
};

export default ProductList;
