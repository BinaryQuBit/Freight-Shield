const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();

// cor setup
const cors = require("cors"); 
app.use(cors());

// Connect to MongoDB
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open',() => {
    console.log('Database connected successfully.');
})

// Add middleware
app.use(express.json());

// Set up routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);

});