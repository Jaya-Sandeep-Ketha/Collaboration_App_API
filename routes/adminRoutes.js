const express = require("express");
const {
  registerAdmin,
  loginAdmin,
  addUser_mail,
} = require("../controllers/adminController");
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
router.post("/add", authenticateAdmin, addUser_mail);

module.exports = router;
