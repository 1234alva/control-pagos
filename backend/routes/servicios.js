import express from "express";
import client from "../db.js";

const router = express.Router();


// GET: todos los servicios
router.get("/", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM servicios ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener servicios:", err);
    res.status(500).json({ error: "Error al obtener servicios" });
  }
});

// POST: crear un nuevo servicio
router.post("/", async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const result = await client.query(
      "INSERT INTO servicios (nombre, descripcion) VALUES ($1, $2) RETURNING *",
      [nombre, descripcion]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error al crear servicio:", err);
    res.status(500).json({ error: "Error al crear servicio" });
  }
});

// PUT: actualizar un servicio
router.put("/:id", async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const result = await client.query(
      "UPDATE servicios SET nombre = $1, descripcion = $2 WHERE id = $3 RETURNING *",
      [nombre, descripcion, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Servicio no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al actualizar servicio:", err);
    res.status(500).json({ error: "Error al actualizar servicio" });
  }
});

// DELETE: eliminar un servicio
router.delete("/:id", async (req, res) => {
  try {
    const result = await client.query(
      "DELETE FROM servicios WHERE id = $1 RETURNING *",
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Servicio no encontrado" });
    }
    res.json({ mensaje: "Servicio eliminado correctamente" });
  } catch (err) {
    console.error("Error al eliminar servicio:", err);
    res.status(500).json({ error: "Error al eliminar servicio" });
  }
});

export default router;

