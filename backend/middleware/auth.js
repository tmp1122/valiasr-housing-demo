const jwt = require("jsonwebtoken");
const JWT_SECRET = "SUPER_SECRET_KEY";

module.exports = function (req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "توکن ارسال نشده" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "توکن نامعتبر" });
  }
};
