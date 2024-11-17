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

  // If only feature_name is provided
  if (feature_name) {
    console.log("Searching by feature_name:", feature_name);

    const features = await Feature.findAll({
      where: {
        feature_name,
        company_code,
      },
      attributes: ["feature_id", "feature_name", "emailId"], // Ensure emailId is correctly fetched
    });

    console.log("Features found:", features);

    if (!features.length) {
      throw new Error("No features found for the given filters.");
    }

    const emailIds = features.map((feature) => feature.emailId); // Extract email IDs
    console.log("Email IDs from features:", emailIds);

    const users = await User.findAll({
      where: { email: emailIds }, // Query using email instead of employee_id
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

    console.log("Users found for features:", users);

    return [
      {
        project_id: null,
        project_name: null,
        github_repo_name: null,
        users: users.map((user) => user.dataValues),
      },
    ];
  }

  // If only product_name or github_repo_name is provided
  if (product_name || github_repo_name) {
    console.log("Searching by product_name or github_repo_name...");

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

    const users = await User.findAll({
      where: { project_id: projectIds },
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

    console.log("Users found for projects:", users);

    return projects.map((project) => {
      const projectUsers = users.map((user) => user.dataValues); // Directly map dataValues

      return {
        ...project.dataValues,
        users: projectUsers,
      };
    });
  }

  throw new Error("At least one filter parameter is required.");
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
