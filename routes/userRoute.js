const express = require("express");
const router = express.Router();
const { loginUser } = require("../controllers/UserApi");
const { getFeatureDetails } = require("../controllers/projectDetails");
const featureController = require("../controllers/featureController");
const { addUser_mail } = require("../controllers/adminController");
// const { authenticateUser } = require("../middlewares/authMiddleware");

// POST route
router.post("/login", loginUser);
router.post("/projectdetails", getFeatureDetails);
router.post("/submit", featureController.addFeatures);
router.post("/add", addUser_mail);

module.exports = router;
