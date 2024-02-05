const Driver = require('../models/driverModel');
const LogBook = require("../models/logBookModel");
const jwt = require('jsonwebtoken');
require('dotenv').config();


const registerDriver = async (req, res) => {
   
    const newDriver = new Driver(req.body);

    try {
        await newDriver.save();
        res.status(201).send(newDriver);
    } catch (error) {
        res.status(400).send(error);
    }

    //res.json(newDriver);
    //res.send('register driver');
};


const loginDriver = async (req, res) => {
    const { email, password } = req.body;

  try {
    const driver = await Driver.findOne({ email });

    if (!driver) {
      console.log(`No driver found with email: ${email}`);
      return res.status(401).send('Invalid email or password');
    }

    const isMatch = driver.matchPassword(password);
    if (!isMatch) {
      console.log(`Password does not match for email: ${email}`);
      return res.status(401).send('Invalid email or password');
    }

    const token = jwt.sign({ id: driver._id }, process.env.JWT_SECRET);

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const createLogBook = async (req, res) => {
    const logBook = new LogBook(req.body);

    try {
        await logBook.save();
        res.status(201).send(logBook);
    } catch (error) {
        res.status(400).send(error);
    }
};

const getLogBooks = async (req, res) => {
    try {
        const logBooks = await LogBook.find();
        res.status(200).send(logBooks);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    registerDriver,
    loginDriver,
    createLogBook,
    getLogBooks
};
