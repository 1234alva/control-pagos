// routes/usuarios.js
const express = require("express");
const router = express.Router();
const client = require("../db"); // tu conexión a PostgreSQL

// GET todos los usuarios
router.get("/", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM usuarios");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

// POST crear usuario
router.post("/", async (req, res) => {
  try {
    const { nombre, email, rol } = req.body;
    const result = await client.query(
      "INSERT INTO usuarios (nombre, email, rol) VALUES ($1, $2, $3) RETURNING *",
      [nombre, email, rol]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear usuario" });
  }
});

module.exports = router;
