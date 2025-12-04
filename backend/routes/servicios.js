// backend/routes/servicios.js
const express = require("express");
const router = express.Router();
const client = require("../db");

// Listar servicios
router.get("/", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM servicios");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear servicio
router.post("/", async (req, res) => {
  const { nombre, descripcion, precio } = req.body;
  try {
    const result = await client.query(
      "INSERT INTO servicios (nombre, descripcion, precio) VALUES ($1, $2, $3) RETURNING *",
      [nombre, descripcion, precio]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;   // 👈 IMPORTANTE
