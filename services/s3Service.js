const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // From your .env
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // From your .env
  region: process.env.AWS_REGION, // From your .env
});

const uploadFileToS3 = async (file) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME, // Bucket name
    Key: `uploads/${Date.now()}_${file.originalname}`, // File name in S3
    Body: file.buffer,
  };

  return s3.upload(params).promise(); // Returns a promise
};

module.exports = { uploadFileToS3 };
