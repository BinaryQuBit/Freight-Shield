// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser");
// const User = require("./models/Users"); // Ensure this path is correct
// const cors = require("cors");
// const bcrypt = require("bcrypt");
// const app = express();

// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({
//     origin: "http://localhost:3000", // Adjust this to match your front-end URL
//     credentials: true,
// }));

// // MongoDB Connection
// mongoose.connect(process.env.MDB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => {
//     app.listen(process.env.PORT || 8080);
//     console.log("Connected to the Database");
// }).catch(err => {
//     console.error("Database connection error:", err);
// });

// // Generate JWT Token
// const generateToken = (user) => {
//     return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
//         expiresIn: "10h",
//     });
// };

// // Authenticate Token Middleware
// const authenticateToken = (req, res, next) => {
//     const token = req.cookies.token;
//     if (!token) return res.sendStatus(401);

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403);
//         req.user = user;
//         next();
//     });
// };

// // Check Authentication Endpoint
// app.get('/api/checkAuth', (req, res) => {
//     const token = req.cookies.token;
//     if (!token) {
//         return res.json({ isAuthenticated: false });
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err) => {
//         if (err) {
//             return res.json({ isAuthenticated: false });
//         }
//         return res.json({ isAuthenticated: true });
//     });
// });

// // Login Endpoint
// app.post("/login", async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         if (!username || !password) {
//             return res.status(400).json({ message: "Username and password are required" });
//         }

//         const user = await User.findOne({ email: username });
//         if (!user) {
//             return res.status(401).json({ message: "Invalid credentials" });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: "Invalid credentials" });
//         }

//         const token = generateToken(user);
//         res.cookie("token", token, {
//             httpOnly: true,
//             // secure: process.env.NODE_ENV === "production",
//         });

//         res.status(200).json({ message: "Login successful", role: user.role });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Error logging in user" });
//     }
// });

// // Registration Endpoint
// app.post("/register", async (req, res) => {
//     try {
//         const { role, username, password, confirmPassword } = req.body;
//         if (!role || !username || !password || password !== confirmPassword) {
//             return res.status(400).json({ message: "Invalid data provided" });
//         }

//         // Custom role validation logic here, if necessary

//         const existingUser = await User.findOne({ email: username });
//         if (existingUser) {
//             return res.status(400).json({ message: "User already exists" });
//         }

//         const saltRounds = 10;
//         const hashedPassword = await bcrypt.hash(password, saltRounds);
//         const newUser = new User({
//             role: role,
//             email: username,
//             password: hashedPassword,
//         });

//         await newUser.save();
//         res.status(201).json({ message: "User registered successfully" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Error registering user" });
//     }
// });

// // Active Loads Endpoint
// app.get('/activeloads', authenticateToken, async (req, res) => {
//     // Logic to fetch and return active loads
//     // This could involve querying your database and returning the results
//     // Example:
//     // const loads = await Load.find({ status: 'active' });
//     // res.json(loads);
// });

// // Additional routes and logic as needed...

// module.exports = app; // If you're using module.exports

import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
const port = process.env.PORT || 8080;
import userRoutes from "./routes/userRoutes.js";

import cors from "cors"



connectDB();

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("Server is ready"));

app.use(notFound);
app.use(errorHandler);


app.listen(port, () => console.log(`Server started on port ${port}`));

// - **POST /api/users** - Register a user
// - **POST /api/users/auth** - Authenticate a user and get token
// - **POST /api/users/logout** - Logout user and cleaesr cookie
// - **GET /api/users/profile** - Get user profile ~ This will be a protected route
// - **PUT /api/users/profile** - Update profile ~ This will be a protected route
