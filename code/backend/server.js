// Loading configured data into process.env
require("dotenv").config();

// Express Framework
const express = require("express");

// Mongoose for MongoDB
const mongoose = require("mongoose");

// User Schema
const User = require("./models/Users");

// Cross-Origin Resource Sharing
const cors = require("cors");

// bcrypt for password hashing
const bcrypt = require("bcrypt");

// New Express Application
const app = express();

// Enable CORS
app.use(cors());

// Parse JSON data
app.use(express.json());

// Getting the connection from MongoDB
const MongoDBConnection = process.env.MDB_URL;
mongoose
  .connect(MongoDBConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT || 8080);
    console.log("Connected to the Database");
  })
  .catch((err) => console.log("Error: ", err));

// Registration Route
app.post("/register", async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;

    // Basic validation
    if (!username || !password || password !== confirmPassword) {
      return res.status(400).json({ message: "Invalid data provided" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Creating a new user
    const user = new User({
      email: username,
      password: hashedPassword,
    });

    // Saving the user in the database
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
});

