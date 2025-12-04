// backend/routes/pagos.js
const express = require("express");
const router = express.Router();
const client = require("../db");

// Listar pagos
router.get("/", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM pagos");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
