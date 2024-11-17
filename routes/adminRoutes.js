const express = require("express");
const { registerAdmin, loginAdmin } = require("../controllers/adminController");
const upload = require("../middlewares/uploadMiddleware");
const csvController = require("../controllers/csvController");
const { authenticateAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerAdmin);

router.post(
  "/upload",
  authenticateAdmin,
  upload.single("file"),
  csvController.uploadCSV
);

router.post("/login", loginAdmin);

module.exports = router;
