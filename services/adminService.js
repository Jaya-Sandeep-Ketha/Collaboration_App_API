const { Admin, Company } = require("../models");
const jwt = require("jsonwebtoken");

const generateCompanyCode = async (company_name, location) => {
  const baseCode =
    company_name.substring(0, 6).toUpperCase() + location.toUpperCase();
  let uniqueCode = baseCode;
  let counter = 1;

  // Ensure uniqueness of the company code
  while (await Admin.findOne({ where: { company_code: uniqueCode } })) {
    uniqueCode = `${baseCode}${counter}`;
    counter++;
  }

  return uniqueCode;
};

const registerAdmin = async (adminData) => {
  const {
    admin_fname,
    admin_lname,
    emailId,
    password,
    company_name,
    location,
  } = adminData;

  // Generate unique Company Code
  const companyCode = await generateCompanyCode(company_name, location);

  // Step 1: Register Admin in the database
  const newAdmin = await Admin.create({
    admin_fname,
    admin_lname,
    emailId,
    password,
    company_name,
    location,
    company_code: companyCode,
  });

  console.log(`Admin created with company code: ${companyCode}`);

  // Step 2: Update Companies table with generated company code
  await Company.create({
    company_code: companyCode,
    company_name,
    location,
  });

  console.log(`Company with code ${companyCode} added to Companies table.`);

  return newAdmin.company_code;
};

const adminLogin = async (emailId, password) => {
  if (!emailId || !password) {
    throw new Error("Email and password are required");
  }

  const admin = await Admin.findOne({ where: { emailId: emailId } });

  if (!admin) {
    throw new Error("Invalid email or password");
  }

  // Simulate password validation; replace with bcrypt for hashed passwords
  if (admin.password !== password) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    { adminId: admin.id, company_code: admin.company_code },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token, company_code: admin.company_code };
};

module.exports = { registerAdmin, adminLogin };
