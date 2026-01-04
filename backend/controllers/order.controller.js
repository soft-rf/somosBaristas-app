const dbService = require("../services/database.service");
const ticketService = require("../services/ticket.service"); // Importar el nuevo servicio

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

    // *** NUEVO: Generar y guardar el ticket HTML ***
    // Asegurarse de que newOrder tenga todos los campos necesarios para el ticket
    // La función createOrder de dbService ya devuelve el objeto completo
    await ticketService.generateAndSaveTicket(newOrder);

    // *** NUEVO: Generar el link de WhatsApp ***
    const whatsappUrl = ticketService.generateWhatsAppUrl(newOrder);
    // ***********************************************

    // Devolvemos la orden Y la URL de WhatsApp
    res.status(201).json({ order: newOrder, whatsappUrl });
  } catch (error) {
    console.error("Error en el controlador al crear el pedido:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor al crear el pedido." });
  }
}

module.exports = { createOrder };
