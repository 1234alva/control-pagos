const express = require("express");
const router = express.Router();
const client = require("../db");

// GET todos los pagos de un usuario específico
router.get("/:id/pagos", async (req, res) => {
  try {
    const usuarioId = req.params.id;

    const result = await client.query(
      `SELECT 
         p.id,
         u.nombre AS usuario,
         u.email,
         s.nombre AS servicio,
         p.monto,
         p.mes_pagado,
         p.fecha
       FROM pagos p
       JOIN usuarios u ON p.usuario_id = u.id
       JOIN servicios s ON p.servicio_id = s.id
       WHERE p.usuario_id = $1
       ORDER BY p.fecha DESC`,
      [usuarioId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error en consulta pagos de usuario:", err);
    res.status(500).json({ error: "Error al obtener pagos del usuario" });
  }
});

module.exports = router;

