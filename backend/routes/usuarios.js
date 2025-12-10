// routes/usuarios.js
const express = require("express");
const router = express.Router();
const client = require("../db"); // conexión a PostgreSQL

// GET todos los usuarios
router.get("/", async (req, res) => {
  try {
    // Forzamos esquema public para evitar errores de search_path
    const result = await client.query("SELECT * FROM public.usuarios");
    res.json(result.rows);
  } catch (err) {
    console.error("Error en consulta usuarios:", err.message); // log detallado
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

// POST crear usuario
router.post("/", async (req, res) => {
  try {
    const { nombre, email, rol } = req.body;

    const result = await client.query(
      "INSERT INTO public.usuarios (nombre, email, rol) VALUES ($1, $2, $3) RETURNING *",
      [nombre, email, rol]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error en creación de usuario:", err.message); // log detallado
    res.status(500).json({ error: "Error al crear usuario" });
  }
});

module.exports = router;
