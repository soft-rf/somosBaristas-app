const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

let db;

/**
 * Inicializa la conexión con la base de datos SQLite y crea las tablas si no existen.
 */
async function initializeDatabase() {
  if (db) return; // Evita reinicializar si ya está conectada.

  try {
    db = await open({
      filename: "./somosbaristas.db", // El archivo de la base de datos
      driver: sqlite3.Database,
    });

    // SQL para crear las tablas (si no existen)
    await db.exec(`
      CREATE TABLE IF NOT EXISTS product (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT,
        image_url TEXT
      );

      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        products TEXT NOT NULL, -- Almacenaremos el array de productos como un string JSON
        total REAL NOT NULL,
        customer_info TEXT, -- Almacenaremos los datos del cliente como un string JSON
        preferences TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("Base de datos SQLite conectada y tablas aseguradas.");
  } catch (error) {
    console.error("Error al inicializar la base de datos SQLite:", error);
    process.exit(1); // Detiene la aplicación si la BD no puede iniciar
  }
}

/**
 * Obtiene los detalles de los productos desde la base de datos usando sus IDs.
 * @param {string[]} productIds - Un array de IDs de productos.
 * @returns {Promise<Object>} Un objeto que mapea ID de producto a sus datos { title, price }.
 */
async function getProductsByIds(productIds) {
  // Creamos placeholders (?) para cada ID
  const placeholders = productIds.map(() => "?").join(",");
  const sql = `SELECT id, name, price FROM product WHERE id IN (${placeholders})`;

  const rows = await db.all(sql, productIds);

  return rows.reduce((acc, product) => {
    acc[product.id] = { title: product.name, price: product.price };
    return acc;
  }, {});
}
/**
 * Obtiene todos los productos de la base de datos.
 * @returns {Promise<Array>} Un array con todos los productos.
 */
async function getAllProducts() {
  const sql = "SELECT * FROM product ORDER BY id ASC";
  return await db.all(sql);
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

  // Convertimos los objetos a string JSON para guardarlos en SQLite
  const productsJson = JSON.stringify(products);
  const customerJson = JSON.stringify(customer);

  const sql = `
    INSERT INTO orders (products, total, customer_info, preferences)
    VALUES (?, ?, ?, ?)
  `;

  const result = await db.run(sql, [
    productsJson,
    total,
    customerJson,
    preferences,
  ]);

  // Devolvemos el pedido recién insertado
  const newOrder = await db.get(
    "SELECT * FROM orders WHERE id = ?",
    result.lastID
  );

  // Parseamos los campos JSON antes de devolverlos para que sean objetos
  return {
    ...newOrder,
    products: JSON.parse(newOrder.products),
    customer_info: JSON.parse(newOrder.customer_info),
  };
}

module.exports = {
  initializeDatabase,
  getProductsByIds,
  getAllProducts,
  createOrder,
};
