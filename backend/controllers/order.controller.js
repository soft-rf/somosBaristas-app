const dbService = require("../services/database.service");

/**
 * Controlador para crear un nuevo pedido.
 * Valida los datos de entrada y los pasa al servicio de base de datos.
 */
async function createOrder(req, res) {
  const { products, total, customer, preferences } = req.body;

  // Validación básica de los datos recibidos
  if (
    !products ||
    !Array.isArray(products) ||
    products.length === 0 ||
    !total
  ) {
    return res
      .status(400)
      .json({ message: "Datos del pedido incompletos o inválidos." });
  }

  try {
    const orderData = {
      products,
      total,
      customer,
      preferences,
    };

    const newOrder = await dbService.createOrder(orderData);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error en el controlador al crear el pedido:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor al crear el pedido." });
  }
}

module.exports = { createOrder };
