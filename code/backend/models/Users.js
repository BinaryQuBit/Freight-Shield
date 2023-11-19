const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true, // Ensures emails are unique
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
