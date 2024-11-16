const jwt = require("jsonwebtoken");

const authenticateAdmin = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // Attaches admin details, including company_code, to the request
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token." });
  }
};

module.exports = authenticateAdmin;
