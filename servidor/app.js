const express = require("express");
const app = express();
const cors = require("cors");

// conectar el servidor
const routes = require("./routes/index");

// Habilitar express.json nuevas versiones de express sucesor de bodyparser
app.use(express.json({ extended: true }));

app.use(cors());

// Rutas de la app
app.use("/api", routes);

module.exports = app;
