const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/Users");
const Shipper = require("./models/Shippers");
const Load =  require("./models/Loads")
const session = require('express-session');

let newEmail;

const app = express();
app.use(cors());
app.use(express.json());

app.use(session({
  secret: process.env.KEY,
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  console.log(req.session);
  next();
});



// Connect to MongoDB
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Database connected successfully.");
});

/** Register Route*/
app.post("/register", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (user) {
      res.json("Already registered");
    } else {
      User.create(req.body)
        .then((user_form) => res.json(user_form))
        .catch((err) => res.json(err));
    }
  });
});

/** Post Load Route*/
app.post("/postLoad", async(req, res) => {
  try {
    const pickUpLocation = req.body.pickUpLocation;
    const pickUpDate = req.body.pickUpDate;
    const pickUpTime = req.body.pickUpTime;
    const dropOffLocation = req.body.dropOffLocation;

    // Create Shipper instance
    const load = new Load({
      pickUpLocation,
      pickUpDate,
      pickUpTime,
      dropOffLocation
    });

    // Save Shipper to the database
    const savedLoad = await load.save();
    res.json(savedLoad);
    
  } catch (err) {
    res.json({ error: err.message });
  }
});

/** Post Load*/
// app.post("/shipperBusinessDetail", (req, res) => {
//   Shipper.create(req.body)
//     .then((shipper_form) => res.json(shipper_form))
//     .catch((err) => res.json(err));
// });
app.post("/shipperBusinessDetail", async (req, res) => {
  try {
    const businessNumber = req.body.businessNumber;
    const proofOfBusiness = req.body.proofOfBusiness;
    const proofOfInsurance = req.body.proofOfInsurance;
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    const password = req.body.password;

    // Create Shipper instance
    const shipper = new Shipper({
      businessNumber,
      proofOfBusiness,
      proofOfInsurance,
      name,
      phoneNumber,
      email,
      password
    });

    // Save Shipper to the database
    const savedShipper = await shipper.save();

    
    req.session.email = email;
    newEmail = req.session.email
    // res.redirect('/shipperCompanyDetail');
    console.log('Email stored in session:', req.session.email);

    res.json(savedShipper);
    
  } catch (err) {
    res.json({ error: err.message });
  }
});

/** Shipper company route ************/
app.post("/shipperCompanyDetail", async (req, res) => {
  try {
    console.log(newEmail);
    const businessName = req.body.businessName;
    const streetNumber = req.body.streetNumber;
    const apartment = req.body.apartment;
    const postalCode = req.body.postalCode;
    const country = req.body.country;
    const province = req.body.province;
    const companyPhoneNumber = req.body.companyPhoneNumber;
    const companyEmail = req.body.companyEmail;
    const website = req.body.website;

    console.log(Shipper.businessName); // Getting Null
    // Find the Shipper by email
    const shipper = await Shipper.findOne({ email: newEmail });

    if (!shipper) {
      return res.status(404).json({ error: "Shipper not found with the provided email." });
    }

    // Update the Shipper's company details
    console.log(shipper.businessName);
    shipper.businessName = businessName;
    shipper.streetNumber = streetNumber;
    shipper.apartment = apartment;
    shipper.postalCode = postalCode;
    shipper.country = country;
    shipper.province = province;
    shipper.companyPhoneNumber = companyPhoneNumber;
    shipper.companyEmail = companyEmail;
    shipper.website = website;

    // Save the updated Shipper to the database
    const savedShipper = await shipper.save();

    res.json(savedShipper);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/** Shipper company route ************/
// app.post("/shipperCompanyDetail", async (req, res) => {
//   try {
//     const businessName = req.body.businessName;
//     const streetNumber = req.body.streetNumber;
//     const apartment = req.body.apartment;
//     const postalCode = req.body.postalCode;
//     const country = req.body.country;
//     const province = req.body.province;
//     const companyPhoneNumber = req.body.companyPhoneNumber;
//     const companyEmail = req.body.companyEmail;
//     const website = req.body.website;

//     // Create Shipper instance
//     const shipper = new Shipper({
//       businessName,
//       streetNumber,
//     apartment,
//     postalCode,
//     country,
//     province,
//     companyPhoneNumber,
//     companyEmail,
//     website
//     });

//     // Save Shipper to the database
//     const savedShipper = await shipper.save();

//     res.json(savedShipper);
//   } catch (err) {
//     res.json({ error: err.message });
//   }
// });

/** LogIn Route */
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  Shipper.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("Wrong password");
      }
    } else {
      res.json("No records found! ");
    }
  });
});

// Set up routes
app.get("/", (req, res) => {
  res.json("Hello, world!");
});

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
