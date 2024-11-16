const express = require("express");
require("dotenv").config();
const db = require('./models');  // Import models
const userRoute = require("./routes/userRoute");

const app = express();
app.use(express.json());
app.use('/api', userRoute);

// Test connection and sync database
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to AWS RDS successfully.");
    return db.sequelize.sync(); // Ensure tables exist
  })
  .then(() => console.log("Database synchronized."))
  .catch((err) => console.error("Unable to connect to the database:", err));

// Create a new user
app.post("/users", async (req, res) => {
  try {
    const user = await db.User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Fetch all users
app.get("/users", async (req, res) => {
  try {
    const users = await db.User.findAll();
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