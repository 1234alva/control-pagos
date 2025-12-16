import express from "express";
import client from "../db.js";
import verificarToken from "../middleware/auth.js";

const router = express.Router();

// 📌 GET: pagos de un usuario (protegido)
router.get("/:id/pagos", verificarToken, async (req, res) => {
  try {
    if (parseInt(req.params.id) !== req.usuarioId) {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    const result = await client.query(
      `SELECT p.id, u.nombre AS usuario, u.email, s.nombre AS servicio,
              p.monto, p.mes_pagado, p.fecha_pago
       FROM pagos p
       JOIN usuarios u ON p.usuario_id = u.id
       JOIN servicios s ON p.servicio_id = s.id
       WHERE p.usuario_id = $1
       ORDER BY p.fecha_pago DESC`,
      [req.usuarioId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener pagos:", err);
    res.status(500).json({ error: "Error al obtener pagos del usuario" });
  }
});

// 📌 POST: registrar pago de un usuario
router.post("/:id/pagos", verificarToken, async (req, res) => {
  try {
    const { servicio_id, monto, mes_pagado } = req.body;
    const result = await client.query(
      `INSERT INTO pagos (usuario_id, servicio_id, monto, mes_pagado)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [req.usuarioId, servicio_id, monto, mes_pagado]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error al registrar pago:", err);
    res.status(500).json({ error: "Error al registrar pago" });
  }
});

export default router;
