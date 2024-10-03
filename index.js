const express = require("express");
const app = express();
const path = require("path");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Import user model
const userModel = require("./models/user");

// Route for the home page
app.get("/", (req, res) => {
  res.render("index");
});

// Route to read users from the database
app.get("/read", async (req, res) => {
  try {
    let users = await userModel.find();
    res.render("read", { users });
  } catch (error) {
    res.status(500).send({ error: "Error reading users" });
  }
});

// Route to delete a user by ID
app.get("/delete/:id", async (req, res) => {
  try {
    await userModel.findOneAndDelete({ _id: req.params.id });
    res.redirect("/read");
  } catch (error) {
    res.status(500).send({ error: "Error deleting user" });
  }
});

// Route to create a new user
app.post("/create", async (req, res) => {
  try {
    let { name, email, image } = req.body;
    await userModel.create({ name, email, image });
    res.redirect("/read");
  } catch (error) {
    res.status(500).send({ error: "Error creating user" });
  }
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
