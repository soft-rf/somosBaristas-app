// src/components/products/ProductList.jsx

import React from "react";
import styles from "../../styles/ProductList.module.css";
import ProductItem from "./ProductItem";

// Define los datos de los productos de Café
const coffeeData = [
  {
    id: "prod-1",
    title: "En grano x 250gr",
    imageSrc: "/image/granos_café.jpg", // La ruta debe coincidir con public/image/
    altText: "Bolsa de café en grano de 300 gramos",
    price: "$ 500",
    options: [
      { label: "Perú", dataOrigin: "peru", dataId: "c300-peru" },
      { label: "Brasil", dataOrigin: "brasil", dataId: "c300-brasil" },
      { label: "Colombia", dataOrigin: "colombia", dataId: "c300-colombia" },
    ],
  },
  {
    id: "prod-2",
    title: "En grano x 500gr",
    imageSrc: "/image/granos_café.jpg",
    altText: "Bolsa de café en grano de 500 gramos",
    price: "$ 900",
    options: [
      { label: "Perú", dataOrigin: "peru", dataId: "c500-peru" },
      { label: "Brasil", dataOrigin: "brasil", dataId: "c500-brasil" },
      { label: "Colombia", dataOrigin: "colombia", dataId: "c500-colombia" },
    ],
  },
];

const accessoriesData = [
  {
    id: "prod-3",
    title: "MOLINOS MANUALES",
    imageSrc: "/image/molino-manual.png",
    altText: "Molino manual de café",
    price: "$ 79.500",
    isAvailable: true,
    // Las opciones singulares (molino y balanza) se manejan con un array de 1
    options: [
      {
        label: "Modelo 1",
        dataOrigin: "modelo1",
        dataId: "molino-modelo1",
      },
      {
        label: "Modelo 2",
        dataOrigin: "modelo2",
        dataId: "molino-modelo2",
      },
    ],
  },
  {
    id: "prod-5",
    title: "Cafeteras de filtro",
    imageSrc: "/image/cafetera-filtro.png",
    altText: "Cafetera de filtro manual",
    price: "$ 65.000",
    isAvailable: true,
    options: [
      {
        label: "Modelo 1",
        dataOrigin: "modelo1",
        dataId: "cafetera-modelo1",
      },
      {
        label: "Modelo 2",
        dataOrigin: "modelo2",
        dataId: "cafetera-modelo2",
      },
    ],
  },
  {
    id: "prod-4",
    title: "Balanza",
    imageSrc: "/image/balanza.png",
    altText: "Balanza digital con cronómetro",
    price: "$ 50.000",
    isAvailable: true,
    options: [
      {
        label: "Modelo 1",
        dataOrigin: "modelo1",
        dataId: "balanza-modelo1",
      },
      {
        label: "Modelo 2",
        dataOrigin: "modelo2",
        dataId: "balanza-modelo2",
      },
    ],
  },
];

const ProductList = () => {
  return (
    <section className={styles.productList}>
      <div className={styles.categoryBadge}>café</div>
      {coffeeData.map((product) => (
        <ProductItem
          key={product.id} // Usar un ID único en lugar del índice
          {...product}
        />
      ))}

      <div className={styles.categoryBadgeAccessories}>accesorios</div>
      {accessoriesData.map((product) => (
        <ProductItem key={product.id} {...product} />
      ))}
    </section>
  );
};

export default ProductList;
