const express = require('express');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
require('./db/database');
const morgan = require('morgan');

const app = express();
app.use(express.json());

app.use(morgan('dev'));
app.use('/api/users', userRoutes);


const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});