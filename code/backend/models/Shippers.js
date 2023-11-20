const mongoose = require('mongoose');

// Define the User schema
const shippersSchema = new mongoose.Schema({

  //-----------business detail----------------
    businessNumber : Number,
    proofOfBusiness: String,
    proofOfInsurance: String,
    name : String,
    phoneNumber : Number,
    email : String,
    password : String,

    //------------Company detail---------------
    businessName: String,
    streetNumber: Number,
    apartment:String,
    city:String,
    postalCode:String,
    country:String,
    province:String,
    companyPhoneNumber:Number,
    companyEmail: String,
    website: String
});

// Create the User model
const Shippers = mongoose.model('shippers', shippersSchema);
module.exports = Shippers;