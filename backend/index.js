const express = require("express");
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Importar conexión a la base de datos
const client = require("./db");

// Importar rutas
const usuariosRoutes = require("./routes/usuarios");
const serviciosRoutes = require("./routes/servicios");
const pagosRoutes = require("./routes/pagos");

const usuarioPagosRoutes = require("./routes/usuario_pagos");

// Usar rutas
app.use("/usuarios", usuariosRoutes);       // CRUD de usuarios
app.use("/usuarios", usuarioPagosRoutes);   // Subruta /usuarios/:id/pagos
app.use("/servicios", serviciosRoutes);
app.use("/pagos", pagosRoutes);

// Endpoint de prueba
app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ error: "Error interno del servidor" });
});

// Levantar servidor
app.listen(4000, () => {
  console.log("Servidor corriendo en http://localhost:4000");
});
