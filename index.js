const express = require("express");
const db = require("./models"); // Ensure models are properly imported

const app = express();
app.use(express.json());

// Sync all models and ensure the table exists
db.sequelize
  .sync({ force: true }) // Use { force: true } to drop and recreate tables
  .then(() => console.log("Database synchronized."))
  .catch((err) => console.error("Sync error:", err));

// Create a new user
app.post("/users", async (req, res) => {
  try {
    const user = await db.User.create(req.body); // Ensure db.User exists and is used correctly
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
