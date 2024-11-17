const express = require("express");
const router = express.Router();
const { loginUser } = require("../controllers/UserApi");
const { ProjectsDetails } = require("../controllers/projectDetails");
const featureController = require("../controllers/featureController");
const { authenticateUser } = require("../middlewares/authMiddleware");

// POST route
router.post("/login", loginUser);
router.post("/projectdetails", ProjectsDetails);
router.post("/submit", express.json(), featureController.submitForm);

router.post("/me", authenticateUser, (req, res) => {
  const { userId, email, company_code } = req.user;
  res.status(200).json({ userId, email, company_code });
});

module.exports = router;
