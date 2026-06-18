const express = require("express");
const db = require("../db");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "دسترسی غیرمجاز" });

  const [rows] = await db.query("SELECT * FROM users");
  res.json(rows);
});

router.post("/approve/:id", auth, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "دسترسی غیرمجاز" });

  await db.query("UPDATE users SET status = 'approved' WHERE id = ?", [
    req.params.id,
  ]);

  res.json({ message: "عضو تأیید شد" });
});

module.exports = router;
