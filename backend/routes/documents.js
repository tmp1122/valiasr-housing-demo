const express = require("express");
const multer = require("multer");
const db = require("../db");
const auth = require("../middleware/auth");
const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/upload", auth, upload.single("file"), async (req, res) => {
  await db.query(
    "INSERT INTO documents (user_id, file_path, doc_type) VALUES (?, ?, ?)",
    [req.user.id, req.file.path, req.body.doc_type]
  );

  res.json({ message: "مدرک با موفقیت آپلود شد" });
});

module.exports = router;
