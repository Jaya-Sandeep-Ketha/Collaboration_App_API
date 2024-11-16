const jwt = require("jsonwebtoken");

const authenticateAdmin = (req, res, next) => {
  const token = req.headers["authorization"];

  // Log the received token
  console.log("Authorization header:", token);

  if (!token) {
    console.log("No token provided in the request.");
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(
      token.replace("Bearer ", "").trim(),
      process.env.JWT_SECRET
    );

    // Log the decoded token payload
    console.log("Decoded token:", decoded);

    req.admin = decoded; // Attach admin details (id, company_code) to the request
    next();
  } catch (err) {
    // Log the error details for debugging
    console.error("Token verification failed:", err.message);
    return res.status(403).json({ message: "Invalid token." });
  }
};

module.exports = authenticateAdmin;
