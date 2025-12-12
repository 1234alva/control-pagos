const express = require("express");
const router = express.Router();
const client = require("../db");
const verificarToken = require("../middleware/auth"); // 👈 importar middleware

// Ruta protegida
router.get("/:id/pagos", verificarToken, async (req, res) => {
  if (parseInt(req.params.id) !== req.usuarioId) {
    return res.status(403).json({ error: "Acceso denegado" });
  }

  // lógica normal...
});


// 📌 GET: todos los pagos de un usuario (enriquecido con JOIN)
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
    console.error("Error al obtener pagos:", err);
    res.status(500).json({ error: "Error al obtener pagos del usuario" });
  }
});

// 📌 POST: registrar un nuevo pago
router.post("/:id/pagos", async (req, res) => {
  try {
    const usuarioId = req.params.id;
    const { servicio_id, monto, mes_pagado } = req.body;

    const result = await client.query(
      `INSERT INTO pagos (usuario_id, servicio_id, monto, mes_pagado)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [usuarioId, servicio_id, monto, mes_pagado]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error al registrar pago:", err);
    res.status(500).json({ error: "Error al registrar pago" });
  }
});

// 📌 PUT: actualizar un pago existente
router.put("/:id/pagos/:idPago", async (req, res) => {
  try {
    const usuarioId = req.params.id;
    const idPago = req.params.idPago;
    const { servicio_id, monto, mes_pagado } = req.body;

    const result = await client.query(
      `UPDATE pagos
       SET servicio_id = $1, monto = $2, mes_pagado = $3
       WHERE id = $4 AND usuario_id = $5
       RETURNING *`,
      [servicio_id, monto, mes_pagado, idPago, usuarioId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Pago no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al actualizar pago:", err);
    res.status(500).json({ error: "Error al actualizar pago" });
  }
});

// 📌 DELETE: eliminar un pago
router.delete("/:id/pagos/:idPago", async (req, res) => {
  try {
    const usuarioId = req.params.id;
    const idPago = req.params.idPago;

    const result = await client.query(
      `DELETE FROM pagos
       WHERE id = $1 AND usuario_id = $2
       RETURNING *`,
      [idPago, usuarioId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Pago no encontrado" });
    }

    res.json({ mensaje: "Pago eliminado correctamente" });
  } catch (err) {
    console.error("Error al eliminar pago:", err);
    res.status(500).json({ error: "Error al eliminar pago" });
  }
});

module.exports = router;
