import express from "express";
import usuariosRoutes from "./routes/usuarios.js";
import serviciosRoutes from "./routes/servicios.js";
import pagosRoutes from "./routes/pagos.js";
import usuarioPagosRoutes from "./routes/usuario_pagos.js";
import authRoutes from "./routes/auth.js";

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Montar las rutas
app.use("/usuarios", usuariosRoutes);
app.use("/servicios", serviciosRoutes);
app.use("/pagos", pagosRoutes);
app.use("/usuario-pagos", usuarioPagosRoutes);
app.use("/auth", authRoutes);

// Arrancar servidor
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
