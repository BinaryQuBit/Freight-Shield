const mongoose = require('mongoose');

// Define the User schema
const loadsSchema = new mongoose.Schema({

    pickUpLocation: String,
    pickUpDate: String,
    pickUpTime: String,
    dropOffLocation:String,
});

// Create the User model
const Loads = mongoose.model('loads', loadsSchema);
module.exports = Loads;