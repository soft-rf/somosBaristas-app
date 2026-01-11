import React from "react";
import ProductItem from "./ProductItem";
import { MOCK_PRODUCTS } from "../../data/productMocks";
import styles from "../../styles/ProductList.module.css";

const ProductList = () => {
  // Función para agrupar productos por nombre (ej. "Café en Grano")
  const groupProducts = (products) => {
    const grouped = {};
    products.forEach((p) => {
      // Extrae el nombre base del producto, ignorando el peso/formato
      const name = p.name.replace(/\s\d+gr|\s\d+kg/i, "").trim();
      if (!grouped[name]) {
        grouped[name] = {
          title: name,
          imageSrc: p.imagen,
          altText: `Imagen de ${name}`,
          options: [],
          // isAvailable will be determined by the options, but for now let's say true if at least one is available
          isAvailable: products.some(prod => prod.name.startsWith(name) && prod.stockDisponible > 0),
        };
      }
      grouped[name].options.push({
        label: p.formato,
        dataId: p.id,
        dataOrigin: p.origen,
      });
    });
    return Object.values(grouped);
  };

  const coffeeProducts = MOCK_PRODUCTS.filter(p => p.origen !== 'Accesorio');
  const accessoryProducts = MOCK_PRODUCTS.filter(p => p.origen === 'Accesorio');

  const groupedCoffee = groupProducts(coffeeProducts);

  return (
    <section className={styles.productList}>
      <div className={styles.categoryBadge}>café</div>
      {groupedCoffee.map((product, index) => (
        <ProductItem
          key={index}
          title={product.title}
          imageSrc={product.imageSrc}
          altText={product.altText}
          options={product.options}
          isAvailable={product.isAvailable}
        />
      ))}

      <div className={styles.categoryBadgeAccessories}>accesorios</div>
      {accessoryProducts.map((product) => (
        <ProductItem
            key={product.id}
            title={product.name}
            imageSrc={product.imagen}
            altText={`Imagen de ${product.name}`}
            options={[{
                label: product.formato,
                dataId: product.id,
                dataOrigin: product.origen
            }]}
            isAvailable={product.stockDisponible > 0}
        />
      ))}
    </section>
  );
};

export default ProductList;