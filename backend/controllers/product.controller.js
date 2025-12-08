const { getAllProducts } = require("../services/database.service");

async function getProducts(req, res) {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    console.error("Error en getProducts:", error.message);
    res.status(500).json({ error: "No se pudieron obtener los productos." });
  }
}

module.exports = {
  getProducts,
};
