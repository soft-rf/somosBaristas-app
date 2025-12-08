// 1. Importamos las dependencias
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { initializeDatabase } = require("./services/database.service");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");

// 2. Configuramos el servidor
const app = express();
const port = process.env.PORT || 3001;

// 3. Middlewares
app.use(cors()); // Permite la comunicación entre frontend y backend
app.use(express.json()); // Permite al servidor entender JSON que viene en las peticiones

// 4. Ruta de prueba
app.get("/", (req, res) => {
  res.send("El servidor del backend de Somos Baristas está funcionando!");
});

// 5. Rutas de la API
app.use("/api", productRoutes);
app.use("/api/orders", orderRoutes);

// 6. Iniciamos el servidor
async function startServer() {
  await initializeDatabase(); // Nos aseguramos de que la BD esté lista

  app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });
}

startServer();
