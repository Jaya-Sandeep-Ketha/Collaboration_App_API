const multer = require("multer");

const storage = multer.memoryStorage(); // Store files in memory for immediate upload
const upload = multer({ storage });

module.exports = upload;
