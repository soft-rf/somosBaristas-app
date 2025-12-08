const { Router } = require("express");
const {
  createOrder,
  getOrders,
} = require("../controllers/order.controller");

const router = Router();

// Ruta para obtener todos los pedidos
// GET /api/orders
router.get("/", getOrders);

// Ruta para crear un nuevo pedido
// POST /api/orders
router.post("/", createOrder);

module.exports = router;
