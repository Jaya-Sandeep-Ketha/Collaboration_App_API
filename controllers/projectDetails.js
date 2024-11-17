const featureService = require("../services/userService");

exports.getFeatureDetails = async (req, res) => {
  try {
    const token = req.headers["authorization"]?.replace("Bearer ", "").trim();

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const { feature_name, product_name, github_repo_name } = req.body;

    if (!feature_name && !product_name && !github_repo_name) {
      return res
        .status(400)
        .json({ message: "At least one search parameter is required" });
    }

    const results = await featureService.getFeatureDetails(token, {
      feature_name,
      product_name,
      github_repo_name,
    });

    res.status(200).json({ message: "Search results", data: results });
  } catch (error) {
    console.error("Error fetching feature details:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
