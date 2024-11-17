const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.authenticateUser = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email or Password is missing");
  }

  const user = await db.User.findOne({ where: { email } });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  // Generate JWT token
  const token = jwt.sign(
    {
      userId: user.employee_id,
      email: user.email,
      company_code: user.company_code, // Assuming company_code exists on the user model
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" } // Token expiration time
  );

  return { token, user };
};
