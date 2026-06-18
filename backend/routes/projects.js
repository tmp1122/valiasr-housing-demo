const express = require("express");
const db = require("../db");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM projects");
  res.json(rows);
});

router.get("/:id/details", async (req, res) => {
  const projectId = req.params.id;

  const [[project]] = await db.query(
    "SELECT * FROM projects WHERE id = ?",
    [projectId]
  );

  const [images] = await db.query(
    "SELECT * FROM project_images WHERE project_id = ?",
    [projectId]
  );

  res.json({ project, images });
});

module.exports = router;
