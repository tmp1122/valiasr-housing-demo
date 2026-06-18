const express = require("express");
const db = require("../db");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/my", auth, async (req, res) => {
  const [rows] = await db.query(
    "SELECT * FROM installments WHERE user_id = ? ORDER BY due_date ASC",
    [req.user.id]
  );
  res.json(rows);
});

router.post("/pay/:id", auth, async (req, res) => {
  const installmentId = req.params.id;

  await db.query(
    "UPDATE installments SET paid = 1, paid_at = NOW(), tracking_code = ? WHERE id = ?",
    ["TRK" + Date.now(), installmentId]
  );

  res.json({ message: "پرداخت با موفقیت انجام شد" });
});

module.exports = router;
