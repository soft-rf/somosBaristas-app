const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

// Inicializar cliente de Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Faltan las variables de entorno SUPABASE_URL o SUPABASE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Inicializa la conexión (En Supabase es stateless, pero mantenemos la función para compatibilidad).
 */
async function initializeDatabase() {
  try {
    // Verificación simple de conexión
    const { error } = await supabase.from("product").select("id").limit(1);
    if (error) throw error;

    // Mantenimiento automático
    await deleteOldOrders(30);

    console.log("Conexión a Supabase exitosa y lista.");
  } catch (error) {
    console.error("Error al conectar con Supabase:", error.message);
    process.exit(1); // Detiene la aplicación si la BD no puede iniciar
  }
}

/**
 * Obtiene los detalles de los productos desde la base de datos usando sus IDs.
 * @param {string[]} productIds - Un array de IDs de productos.
 * @returns {Promise<Object>} Un objeto que mapea ID de producto a sus datos { title, price }.
 */
async function getProductsByIds(productIds) {
  const { data, error } = await supabase
    .from("product")
    .select("id, name, price")
    .in("id", productIds);

  if (error) throw error;

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
    .select("*")
    .order("id", { ascending: true });
  if (error) throw error;
  return data;
}

/**
 * Inserta un nuevo pedido en la base de datos.
 * @param {object} orderData - Los datos del pedido a guardar.
 * @param {Array} orderData.products - Array de productos en el pedido.
 * @param {number} orderData.total - Total del pedido.
 * @param {object} orderData.customer - Información del cliente.
 * @param {string} orderData.preferences - Preferencias del cliente.
 * @returns {Promise<object>} El pedido recién creado.
 */
async function createOrder(orderData) {
  const { products, total, customer, preferences } = orderData;

  // En Supabase, si la columna es JSONB, pasamos el objeto directo, no stringify.
  const { data, error } = await supabase
    .from("orders")
    .insert({
      products: products,
      total: total,
      customer_info: customer,
      preferences: preferences,
    })
    .select()
    .single();

  if (error) throw error;

  // Supabase ya devuelve los campos JSON como objetos, no necesitamos JSON.parse
  return data;
}

/**
 * Elimina los pedidos que tengan más de 'days' días de antigüedad.
 * Útil para mantener la base de datos ligera.
 * @param {number} days - Número de días de antigüedad para eliminar.
 * @returns {Promise<number>} Número de filas eliminadas.
 */
async function deleteOldOrders(days = 30) {
  // Calculamos la fecha límite
  const dateLimit = new Date();
  dateLimit.setDate(dateLimit.getDate() - days);

  const { error, count } = await supabase
    .from("orders")
    .delete({ count: "exact" })
    .lt("created_at", dateLimit.toISOString());

  if (error) console.error("Error limpiando órdenes antiguas:", error);
  else
    console.log(
      `Mantenimiento: Se eliminaron órdenes anteriores a ${dateLimit.toISOString()}`
    );

  return count;
}

module.exports = {
  initializeDatabase,
  getProductsByIds,
  getAllProducts,
  createOrder,
  deleteOldOrders,
};
