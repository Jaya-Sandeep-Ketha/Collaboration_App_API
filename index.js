const express = require("express");
require("dotenv").config();  // Ensure .env is loaded before requiring any files that use it
const connectDB = require("./db");  // Import MongoDB connection function
const userRoute = require("./routes/userRoute");  // Import routes for user-related API

const app = express();
app.use(express.json());
app.use('/api',userRoute);

// Connect to MongoDB
connectDB();

// // Use user route for handling user-related API requests
// app.use("/api", userRoute);

// // Health check route to ensure the API is running
// app.get("/health", (req, res) => {
//   res.status(200).send("OK\n");
// });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});