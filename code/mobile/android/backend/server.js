const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
//const port = process.env.PORT || 5000;

dotenv.config();

mongoose.connect(process.env.MDB_URL).then(() => console.log('MongoDB connected')).catch(err => console.log(err));


// Define your routes here. 
app.get('/', (req, res) => {
    res.send('Hello, Mohammed Alharbi!');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));