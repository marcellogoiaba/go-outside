const config = require('./config/database');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

//connect to MongoDB
mongoose.connect(config.database);
mongoose.connection.on('connected', ()=>{
  console.log('Connected to db ' + config.database);
});
mongoose.connection.on('error', (err)=>{
  console.log('Connection to db failed, Error '+ err);
})

//inistilise app with express
const app = express();

const users = require('./routes/users');

//variable for port
const port = 3000;

//Cors middleware
app.use(cors());
//body-parser middleware
app.use(bodyParser.json());

//static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);

//index route
app.get('/',(req, res)=>{
  res.send('Invalid endpoint');
});

//start server
app.listen(port, ()=>{
  console.log('Server started on port ' + port);
})
