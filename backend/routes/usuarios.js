const express = require("express");
const router = express.Router();
const client = require("../db");

// GET: todos los usuarios
router.get("/", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM usuarios ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener usuarios:", err);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

// POST: crear un nuevo usuario
router.post("/", async (req, res) => {
  try {
    const { nombre, email } = req.body;
    const result = await client.query(
      "INSERT INTO usuarios (nombre, email) VALUES ($1, $2) RETURNING *",
      [nombre, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error al crear usuario:", err);
    res.status(500).json({ error: "Error al crear usuario" });
  }
});

// PUT: actualizar un usuario
router.put("/:id", async (req, res) => {
  try {
    const { nombre, email } = req.body;
    const result = await client.query(
      "UPDATE usuarios SET nombre = $1, email = $2 WHERE id = $3 RETURNING *",
      [nombre, email, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al actualizar usuario:", err);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
});

// DELETE: eliminar un usuario
router.delete("/:id", async (req, res) => {
  try {
    const result = await client.query(
      "DELETE FROM usuarios WHERE id = $1 RETURNING *",
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ mensaje: "Usuario eliminado correctamente" });
  } catch (err) {
    console.error("Error al eliminar usuario:", err);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
});

module.exports = router;
