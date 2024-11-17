const express = require("express");
const router = express.Router();
const { loginUser } = require("../controllers/UserApi");
const { getFeatureDetails } = require("../controllers/projectDetails");
const featureController = require("../controllers/featureController");

// POST route
router.post("/login", loginUser);
router.post("/projectdetails", getFeatureDetails);
router.post("/submit", featureController.addFeatures);

module.exports = router;
