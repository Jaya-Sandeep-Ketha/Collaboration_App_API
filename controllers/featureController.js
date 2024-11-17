const jwt = require("jsonwebtoken");
const featureService = require("../services/userService");

exports.addFeatures = async (req, res) => {
  try {
    console.log("Received request to add features...");

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

    const features = req.body;

    if (!Array.isArray(features) || features.length === 0) {
      return res
        .status(400)
        .json({ message: "Request body must contain an array of features." });
    }

    const createdFeatures = [];

    for (const featureData of features) {
      const {
        feature_name,
        project_id,
        emailId: featureEmailId,
        company_code: featureCompanyCode,
      } = featureData;

      if (!feature_name || !project_id) {
        console.log("Missing required fields in one of the feature objects.");
        return res.status(400).json({
          message: "Feature name and project ID are required for each feature.",
        });
      }

      console.log(
        "Feature details from request body - feature_name:",
        feature_name,
        "project_id:",
        project_id
      );

      // Use featureData's emailId and company_code if provided; otherwise, fall back to decoded token values
      const feature = await featureService.addFeature({
        feature_name,
        project_id,
        emailId: featureEmailId || emailId,
        company_code: featureCompanyCode || company_code,
      });

      createdFeatures.push(feature);
    }

    console.log("All features successfully added:", createdFeatures);

    res.status(201).json({
      message: "Features added successfully",
      data: createdFeatures,
    });
  } catch (error) {
    console.error("Error adding features:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
