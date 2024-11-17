const express = require("express");
require("dotenv").config();
const { Sequelize } = require("sequelize");
const db = require("./models"); // Ensure models/index.js exports all models
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoutes"); // Import admin routes

const app = express();
app.use(express.json());

// Register routes
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});
app.use("/api/users", userRoute); // Example for user-related endpoints
app.use("/api/admin", adminRoute); // Correctly register admin-related endpoints
// app.use("/api/csv", adminRoute);
// app.use("/api/features", features);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT || 5432,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

// Health check endpoint
app.get("/health", async (req, res) => {
  try {
    res.status(200).send("OK\n");
  } catch (err) {
    console.error("Health check failed:", err);
    res.status(500).send("Unhealthy");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
