const { uploadFileToS3 } = require("../services/s3Service");
const { parseCSVAndSave } = require("../services/csvService");

exports.uploadCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Log the file details
    console.log(`Received file: ${req.file.originalname}`);

    // Upload file to S3
    console.log("Uploading file to S3...");
    const s3Result = await uploadFileToS3(req.file);
    console.log("File uploaded to S3 successfully:", s3Result.Location);

    // Retrieve company_code from the admin's session, set by the authentication middleware
    const company_code = req.admin?.company_code;
    if (!company_code) {
      return res
        .status(403)
        .json({ message: "Unauthorized: Company code is missing" });
    }

    // Process CSV after successful upload
    console.log("Processing CSV...");
    await parseCSVAndSave(s3Result.Location, company_code);

    res.status(200).json({
      message: "File uploaded and processed successfully",
      s3Location: s3Result.Location,
    });
  } catch (error) {
    console.error("Error during CSV upload and processing:", error);
    res
      .status(500)
      .json({ message: "Failed to process file", error: error.message });
  }
};
