const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectionString = process.env.MONGO_URI || "mongodb://localhost:27017/yourdbname"; // Use your MongoDB connection string

    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB successfully.");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;