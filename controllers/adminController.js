const adminService = require("../services/adminService");
const { authenticateAdmin } = require("../middlewares/authMiddleware");
const { adminLogin, addUser } = require("../services/adminService");
const { sendOnboardingEmail } = require("../services/emailService");

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

const addUser_mail = async (req, res) => {
  try {
    const {
      employee_fname,
      employee_lname,
      email,
      chat_name,
      location,
      title,
      reports_to,
      password,
      company_code,
      project_name,
      github_repo_name, // Ensure this is captured from the request
    } = req.body;

    if (
      !employee_fname ||
      !employee_lname ||
      !email ||
      !chat_name ||
      !location ||
      !title ||
      !password ||
      !company_code ||
      !project_name ||
      !github_repo_name // Validate this as well
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required to add a user." });
    }

    const result = await adminService.addUser({
      employee_fname,
      employee_lname,
      email,
      chat_name,
      location,
      title,
      reports_to,
      password,
      company_code,
      project_name,
      github_repo_name, // Pass this to the service
    });

    res.status(201).json({
      message: "User added successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error adding user:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const sendOnboardingRequest = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  const onboardingFormLink = `${
    process.env.ONBOARDING_FORM_URL
  }?email=${encodeURIComponent(email)}`; // Replace with actual form URL

  try {
    await sendOnboardingEmail(email, onboardingFormLink);
    res.status(200).json({ message: "Onboarding email sent successfully." });
  } catch (error) {
    console.error("Error sending onboarding request:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  addUser_mail,
  sendOnboardingRequest,
};
