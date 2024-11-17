const { Admin, Company, Project, sequelize, User } = require("../models");
const jwt = require("jsonwebtoken");

const generateCompanyCode = async (company_name) => {
  const sanitize = (str) => str.replace(/\s+/g, "").toUpperCase(); // Remove spaces and convert to uppercase
  const baseCode = sanitize(company_name).substring(0, 6); // Use only company_name for base code
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

const generateUniqueProjectId = async () => {
  // Find the maximum project_id in the Project table
  const maxProject = await Project.findOne({
    attributes: [[sequelize.fn("MAX", sequelize.col("project_id")), "max_id"]],
  });

  // Increment the max ID by 1 or start from 1 if no records exist
  return maxProject?.dataValues?.max_id ? maxProject.dataValues.max_id + 1 : 1;
};

const generateUniqueEmployeeId = async () => {
  const maxEmployee = await User.findOne({
    attributes: [[sequelize.fn("MAX", sequelize.col("employee_id")), "max_id"]],
  });

  return maxEmployee?.dataValues?.max_id
    ? maxEmployee.dataValues.max_id + 1
    : 1; // Start from 1 if no record exists
};

const addUser = async ({
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
  github_repo_name,
}) => {
  const employee_id = await generateUniqueEmployeeId(); // Generate unique ID

  let project = await Project.findOne({
    where: { company_code, project_name },
  });

  if (!project) {
    const project_id = await generateUniqueProjectId();
    project = await Project.create({
      project_id,
      project_name,
      company_code,
      github_repo_name,
    });
  }

  const user = await User.create({
    employee_id, // Pass the generated ID
    employee_fname,
    employee_lname,
    email,
    chat_name,
    location,
    title,
    reports_to,
    password,
    project_id: project.project_id,
  });

  return user;
};

module.exports = { registerAdmin, adminLogin, addUser };
