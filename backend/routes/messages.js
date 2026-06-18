const express = require("express");
const db = require("../db");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/", auth, async (req, res) => {
  await db.query(
    "INSERT INTO messages (user_id, message) VALUES (?, ?)",
    [req.user.id, req.body.message]
  );
  res.json({ message: "پیام ارسال شد" });
});

router.get("/my", auth, async (req, res) => {
  const [rows] = await db.query(
    "SELECT * FROM messages WHERE user_id = ? ORDER BY id DESC",
    [req.user.id]
  );
  res.json(rows);
});

router.post("/reply/:id", auth, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "دسترسی غیرمجاز" });

  await db.query(
    "UPDATE messages SET reply = ? WHERE id = ?",
    [req.body.reply, req.params.id]
  );

  res.json({ message: "پاسخ ارسال شد" });
});

module.exports = router;
