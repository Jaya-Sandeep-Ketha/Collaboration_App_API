const featureService = require("../services/userService");

exports.getFeatureDetails = async (req, res) => {
  try {
    console.log("Received request for feature details");
    const token = req.headers["authorization"]?.replace("Bearer ", "").trim();

    if (!token) {
      console.log("No token provided in the request.");
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    console.log("Token received:", token);

    const { feature_name, product_name, github_repo_name } = req.body;

    console.log("Request body:", {
      feature_name,
      product_name,
      github_repo_name,
    });

    if (!feature_name && !product_name && !github_repo_name) {
      console.log("No search parameters provided.");
      return res
        .status(400)
        .json({ message: "At least one search parameter is required" });
    }

    console.log("Calling service to get feature details...");

    const results = await featureService.getFeatureDetails(token, {
      feature_name,
      product_name,
      github_repo_name,
    });

    console.log("Feature details retrieved successfully:", results);

    res.status(200).json({ message: "Search results", data: results });
  } catch (error) {
    console.error("Error fetching feature details:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
