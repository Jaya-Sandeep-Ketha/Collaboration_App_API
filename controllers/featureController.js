const jwt = require("jsonwebtoken");
const featureService = require("../services/userService");

exports.addFeature = async (req, res) => {
  try {
    console.log("Received request to add feature...");

    const token = req.headers["authorization"]?.replace("Bearer ", "").trim();
    console.log("Extracted token:", token);

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    // Decode the token to extract user info
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    const { userId: emailId, company_code } = decoded;
    console.log(
      "Extracted from token - emailId:",
      emailId,
      "company_code:",
      company_code
    );

    const { feature_name, project_id } = req.body;

    if (!feature_name || !project_id) {
      console.log("Missing required fields: feature_name or project_id");
      return res
        .status(400)
        .json({ message: "Feature name and project ID are required." });
    }

    console.log(
      "Feature details from request body - feature_name:",
      feature_name,
      "project_id:",
      project_id
    );

    // Call the service to add the feature
    const feature = await featureService.addFeature({
      feature_name,
      project_id,
      emailId,
      company_code,
    });

    console.log("Feature successfully added:", feature);

    res.status(201).json({
      message: "Feature added successfully",
      data: feature,
    });
  } catch (error) {
    console.error("Error adding feature:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
