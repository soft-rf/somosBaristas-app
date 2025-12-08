const express = require("express");
const router = express.Router();

// Importamos solo los controladores que existen
const { createOrder } = require("../controllers/order.controller");

// Definimos la ruta para crear un nuevo pedido
// Esta ruta corresponde a POST /api/orders/
router.post("/", createOrder);

// Por ahora no tenemos una ruta GET para pedidos, así que no la definimos.

module.exports = router;
