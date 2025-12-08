const { createOrder: createOrderService } = require("../services/database.service");

/**
 * Crea un nuevo pedido a partir de los datos del carrito.
 * @param {import("express").Request} req - El objeto de solicitud de Express.
 * @param {import("express").Response} res - El objeto de respuesta de Express.
 */
const fs = require("fs/promises");
const path = require("path");

/**
 * Crea un nuevo pedido, lo imprime en consola y lo guarda en un archivo.
 * @param {import("express").Request} req - El objeto de solicitud de Express.
 * @param {import("express").Response} res - El objeto de respuesta de Express.
 */
async function createOrder(req, res) {
  try {
    const orderData = req.body;

    // 1. Validar que tengamos datos
    if (!orderData || Object.keys(orderData).length === 0) {
      return res.status(400).json({ message: "No se recibieron datos del pedido." });
    }

    // 2. Mostrar el pedido en la consola del backend
    console.log("===============================");
    console.log("🎉 ¡Nuevo Pedido Recibido! 🎉");
    console.log("===============================");
    console.log("Cliente:", orderData.customer);
    console.log("Productos:", orderData.products.map(p => `${p.quantity}x ${p.name}`).join(', '));
    console.log("Total: $", orderData.total);
    console.log("Preferencias:", orderData.preferences);
    console.log("-------------------------------");

    // 3. Guardar el pedido en un archivo .jsonl
    const logFilePath = path.join(__dirname, '..', 'pedidos.jsonl');
    const jsonString = JSON.stringify(orderData);
    await fs.appendFile(logFilePath, jsonString + '\\n');
    console.log(`✅ Pedido guardado en ${logFilePath}`);


    // 4. Enviar una respuesta de éxito al frontend
    res.status(201).json({
      message: "Pedido recibido y guardado con éxito por el servidor.",
      order: orderData,
    });

  } catch (error) {
    console.error("Error al procesar o guardar el pedido:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

module.exports = { createOrder };

module.exports = { createOrder };
