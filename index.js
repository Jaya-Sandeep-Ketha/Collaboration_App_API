const express = require("express");
require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
app.use(express.json());

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

// Define the User model
const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Test connection and sync database
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to AWS RDS successfully.");
    return sequelize.sync(); // Ensure tables exist
  })
  .then(() => console.log("Database synchronized."))
  .catch((err) => console.error("Unable to connect to the database:", err));

// Create a new user
app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body); // Use the defined User model
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Fetch all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

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
