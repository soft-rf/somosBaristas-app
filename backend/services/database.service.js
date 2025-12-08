const { createClient } = require("@supabase/supabase-js");

// Inicializamos el cliente de Supabase una sola vez
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

/**
 * Obtiene los detalles de los productos desde la base de datos usando sus IDs.
 * @param {string[]} productIds - Un array de IDs de productos.
 * @returns {Promise<Object>} Un objeto que mapea ID de producto a sus datos { title, price }.
 */
async function getProductsByIds(productIds) {
  const { data, error } = await supabase
    .from("product") // El nombre de tu tabla
    .select("id, name, price") // Seleccionamos solo los campos que necesitamos
    .in("id", productIds); // `in` es como hacer "WHERE id IN (1, 2, 3)"

  if (error) {
    console.error("Error fetching products from Supabase:", error);
    throw new Error("Could not fetch products from database.");
  }

  // Convertimos el array de respuesta en un objeto para fácil acceso: { '1': { ... }, '2': { ... } }
  return data.reduce((acc, product) => {
    acc[product.id] = { title: product.name, price: product.price };
    return acc;
  }, {});
}

/**
 * Obtiene todos los productos de la base de datos.
 * @returns {Promise<Array>} Un array con todos los productos.
 */
async function getAllProducts() {
  const { data, error } = await supabase
    .from("product")
    .select("*") // Seleccionamos todas las columnas
    .order("id", { ascending: true }); // Opcional: ordenamos por ID

  if (error) {
    console.error("Error fetching all products from Supabase:", error);
    throw new Error("Could not fetch products from database.");
  }
  return data;
}

/**
 * Inserta un nuevo pedido en la base de datos.
 * @param {object} orderData - Los datos del pedido a guardar.
 * @returns {Promise<object>} El pedido recién creado.
 */
async function createOrder(orderData) {
  const { data, error } = await supabase
    .from("orders")
    .insert([
      {
        products: orderData.products,
        total: orderData.total,
      },
    ])
    .select();

  if (error) {
    console.error("Error creating order in Supabase:", error);
    throw new Error("Could not create the order.");
  }

  return data[0];
}

module.exports = { getProductsByIds, getAllProducts, createOrder };
