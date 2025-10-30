// 1. Importamos las dependencias
const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Carga las variables de entorno del archivo .env

// 2. Configuramos el servidor
const app = express();
const port = 3001; // Usaremos un puerto diferente al del frontend

// 3. Middlewares
app.use(cors()); // Permite la comunicación entre frontend y backend
app.use(express.json()); // Permite al servidor entender JSON que viene en las peticiones

// 4. Ruta de prueba
app.get("/", (req, res) => {
  res.send("El servidor del backend de Somos Baristas está funcionando!");
});

// 5. Iniciamos el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
