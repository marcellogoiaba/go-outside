const config = require('./config/dbConnect.js');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');


//inistilise app with express
const app = express();

const users = require('./controllers/users.controller');
const events = require('./controllers/events.controller');

//variable for port
const port = 3000;

//Cors middleware
app.use(cors());
//body-parser middleware
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);


//start server
app.listen(port, () => {
  console.log('Server started on port ' + port);
})
