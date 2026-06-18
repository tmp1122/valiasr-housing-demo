
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth");
const projectsRoutes = require("./routes/projects");
const installmentsRoutes = require("./routes/installments");
const documentsRoutes = require("./routes/documents");
const messagesRoutes = require("./routes/messages");
const usersRoutes = require("./routes/users");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/installments", installmentsRoutes);
app.use("/api/documents", documentsRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/users", usersRoutes);

app.listen(4000, () => console.log("Backend running on port 4000"));
