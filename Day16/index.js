require('dotenv').config();
const express = require("express");
const app = express();
const main = require("./database");
const User = require("./Models/users");

app.use(express.json());

const PORT = process.env.PORT || 4001;


// GET all users
app.get("/info", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: "Error fetching users", error: err.message });
  }
});



// GET single user by name
app.get("/info/:name", async (req, res) => {
  try {
    const user = await User.findOne({ name: req.params.name });
    if (!user) return res.status(404).send({ message: "User not found" });
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: "Error fetching user", error: err.message });
  }
});



// POST create user
app.post("/info", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).send({ message: "User created successfully", user: newUser });
  } catch (err) {
    res.status(500).send({ message: "Error creating user", error: err.message });
  }
});



// PUT update user by name
app.put("/info/:name", async (req, res) => {
  try {
    const result = await User.updateOne({ name: req.params.name }, req.body);
    if (result.matchedCount === 0)
      return res.status(404).send({ message: "User not found" });
    res.status(200).send({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).send({ message: "Error updating user", error: err.message });
  }
});



// DELETE user by name
app.delete("/info/:name", async (req, res) => {
  try {
    const result = await User.deleteOne({ name: req.params.name });
    if (result.deletedCount === 0)
      return res.status(404).send({ message: "User not found" });
    res.status(200).send({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: "Error deleting user", error: err.message });
  }
});



// Start server after DB connection
main()
  .then(async () => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Listening at port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));