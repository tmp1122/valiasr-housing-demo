const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");
const router = express.Router();
const JWT_SECRET = "SUPER_SECRET_KEY";

router.post("/register", async (req, res) => {
  try {
    const { full_name, national_id, phone, email, password } = req.body;

    const [exists] = await db.query(
      "SELECT id FROM users WHERE national_id = ?",
      [national_id]
    );

    if (exists.length > 0)
      return res.status(400).json({ message: "کاربری با این کد ملی وجود دارد" });

    const hash = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (full_name, national_id, phone, email, password_hash) VALUES (?, ?, ?, ?, ?)",
      [full_name, national_id, phone, email, hash]
    );

    res.json({ message: "ثبت‌نام انجام شد" });
  } catch {
    res.status(500).json({ message: "خطای سرور" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { national_id, password } = req.body;

    const [rows] = await db.query(
      "SELECT * FROM users WHERE national_id = ?",
      [national_id]
    );

    if (rows.length === 0)
      return res.status(400).json({ message: "کاربر یافت نشد" });

    const user = rows[0];

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(400).json({ message: "رمز عبور اشتباه است" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user });
  } catch {
    res.status(500).json({ message: "خطای سرور" });
  }
});

module.exports = router;
