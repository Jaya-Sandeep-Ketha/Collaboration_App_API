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
app.use("/api/csv", adminRoute);
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

// Test connection and sync database
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to AWS RDS successfully.");

    // Ensure proper sync order
    await db.Company.sync({ force: true }); // Sync Company table first
    console.log("Company table synchronized.");

    await db.Admin.sync({ force: true }); // Then sync Admin table
    console.log("Admin table synchronized.");

    await db.Project.sync({ force: true }); // Then sync Admin table
    console.log("Project table synchronized.");

    await db.User.sync({ force: true }); // Then sync Admin table
    console.log("User table synchronized.");

    await db.Work.sync({ force: true }); // Then sync Admin table
    console.log("Work table synchronized.");

    await db.WorksOn.sync({ force: true }); // Then sync Admin table
    console.log("Work table synchronized.");

    console.log("Database synchronized.");
  } catch (err) {
    console.error("Unable to connect to the database or sync tables:", err);
  }
})();

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
