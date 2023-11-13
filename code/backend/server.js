const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose'); 
require('dotenv').config();
const User = require ('./models/Users');


const app = express();
app.use(cors());
app.use(express.json());

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

/** Register Route*/
app.post('/register', (req, res)=>{
  const {email, password} = req.body;
  User.findOne({email: email})
  .then(user => {
      if(user){
          res.json("Already registered")
      }
      else{
          User.create(req.body)
          .then(User => res.json(User))
          .catch(err => res.json(err))
      }
  })
})

/** LogIn Route */
app.post('/login', (req, res)=>{
  const {email, password} = req.body;
  User.findOne({email: email})
  .then(user => {
      if(user){
          if(user.password === password) {
              res.json("Success");
          }
          else{
              res.json("Wrong password");
          }
      }
      else{
          res.json("No records found! ");
      }
  })
})


// Set up routes
app.get('/', (req, res) => {
  res.json('Hello, world!');
});




// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);

});