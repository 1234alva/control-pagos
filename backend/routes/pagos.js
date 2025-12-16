import express from "express";
import client from "../db.js";

const router = express.Router();

// Obtener todos los pagos
router.get("/", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM pagos ORDER BY fecha_pago DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener pagos:", err);
    res.status(500).json({ error: "Error al obtener pagos" });
  }
});

// Registrar un nuevo pago
router.post("/", async (req, res) => {
  try {
    const { usuario_id, servicio_id, monto, mes_pagado } = req.body;
    const result = await client.query(
      `INSERT INTO pagos (usuario_id, servicio_id, monto, mes_pagado)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [usuario_id, servicio_id, monto, mes_pagado]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error al registrar pago:", err);
    res.status(500).json({ error: "Error al registrar pago" });
  }
});

// Obtener pagos de un usuario específico
router.get("/usuario/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await client.query(
      "SELECT * FROM pagos WHERE usuario_id = $1 ORDER BY fecha_pago DESC",
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener pagos del usuario:", err);
    res.status(500).json({ error: "Error al obtener pagos del usuario" });
  }
});

export default router;
