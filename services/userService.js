const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Project, User, Feature } = require("../models");

// User Authentication Service
const authorizeUser = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email or Password is missing");
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  // Retrieve project and its associated company_code
  const project = await Project.findOne({
    where: { project_id: user.project_id }, // Assuming user is linked to a project
  });

  if (!project) {
    throw new Error("Project not found for the user!");
  }

  const token = jwt.sign(
    {
      userId: user.employee_id,
      email: user.email,
      company_code: project.company_code, // Get company_code from Project
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token, user };
};

// Decode Token and Extract User Info
const decodeTokenAndGetCompanyCode = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);
    return {
      company_code: decoded.company_code,
      userId: decoded.userId,
      email: decoded.email,
    };
  } catch (err) {
    console.error("Error decoding token:", err.message);
    throw new Error("Invalid or expired token.");
  }
};

const getFeatureDetails = async (
  token,
  { feature_name, product_name, github_repo_name }
) => {
  console.log("Enter getFeatureDetails");
  const { company_code } = decodeTokenAndGetCompanyCode(token);

  console.log("Decoded company code:", company_code);

  // Build dynamic query for Projects based on inputs
  const projectQuery = {
    where: { company_code },
    attributes: ["project_id", "project_name", "github_repo_name"],
  };

  if (product_name) {
    projectQuery.where.project_name = product_name;
    console.log("Filtering by product_name:", product_name);
  }

  if (github_repo_name) {
    projectQuery.where.github_repo_name = github_repo_name;
    console.log("Filtering by github_repo_name:", github_repo_name);
  }

  const projects = await Project.findAll(projectQuery);
  console.log("Projects found:", projects);

  if (!projects.length) {
    throw new Error("No projects found for the given filters.");
  }

  const projectIds = projects.map((project) => project.project_id);
  console.log("Filtered project IDs:", projectIds);

  // If only project details are required (no feature name provided)
  if (!feature_name) {
    console.log("No feature_name provided, returning projects.");
    return projects;
  }

  // Fetch features based on project IDs and feature name
  const features = await Feature.findAll({
    where: {
      project_id: projectIds,
      feature_name,
    },
    attributes: ["feature_id", "feature_name", "project_id", "emailId"],
  });

  console.log("Features found:", features);

  if (!features.length) {
    throw new Error("No features found for the given filters.");
  }

  // Fetch user details for the features
  const userIds = features.map((feature) => feature.emailId);
  console.log("User IDs from features:", userIds);

  const users = await User.findAll({
    where: { employee_id: userIds },
    attributes: [
      "employee_id",
      "employee_fname",
      "employee_lname",
      "email",
      "chat_name",
      "location",
      "title",
      "reports_to",
    ],
  });

  console.log("Users found:", users);

  // Merge feature and user data
  return features.map((feature) => {
    const user = users.find((u) => u.employee_id === feature.emailId);
    console.log("Matching user for feature:", feature.feature_id, user);

    return {
      ...feature.dataValues,
      user: user ? user.dataValues : null,
    };
  });
};

const addFeature = async ({
  feature_name,
  project_id,
  emailId,
  company_code,
}) => {
  console.log("Adding feature with parameters -", {
    feature_name,
    project_id,
    emailId,
    company_code,
  });

  // Fetch project by project_id
  const project = await Project.findOne({ where: { project_id } });
  console.log(
    "Fetched project for project_id:",
    project_id,
    "Project:",
    project
  );

  if (!project) {
    throw new Error("Project not found");
  }

  // Verify company_code consistency
  if (!company_code) {
    console.log("Company code is missing in token, fetching from project");
    company_code = project.company_code;
  }

  console.log("Final company_code used for feature creation:", company_code);

  // Create a new feature
  const feature = await Feature.create({
    feature_name,
    project_id,
    company_code,
    emailId,
  });

  console.log("Feature created successfully:", feature);
  return feature;
};

module.exports = {
  addFeature,
};

module.exports = {
  authorizeUser,
  decodeTokenAndGetCompanyCode,
  getFeatureDetails,
  addFeature,
};
