const adminService = require("../services/adminService");
const { authenticateAdmin } = require("../middlewares/authMiddleware");
const { adminLogin } = require("../services/adminService");

const registerAdmin = async (req, res) => {
  try {
    const {
      admin_fname,
      admin_lname,
      emailId,
      password,
      company_name,
      location,
    } = req.body;

    if (
      !admin_fname ||
      !admin_lname ||
      !emailId ||
      !password ||
      !company_name ||
      !location
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const companyCode = await adminService.registerAdmin({
      admin_fname,
      admin_lname,
      emailId,
      password,
      company_name,
      location,
    });

    return res.status(201).json({
      message: "Admin registered successfully",
      company_code: companyCode,
    });
  } catch (error) {
    console.error("Error registering admin:", error);
    res
      .status(500)
      .json({ message: "Failed to register admin", error: error.message });
  }
};

const loginAdmin = async (req, res) => {
  const { emailId, password } = req.body;

  try {
    const { token, company_code } = await adminLogin(emailId, password);
    res.status(200).json({
      message: "Login successful",
      token,
      company_code,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(401).json({ message: error.message });
  }
};

module.exports = { registerAdmin, loginAdmin };
