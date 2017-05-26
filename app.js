const config = require('./config/dbConnect.js');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const routes = require('./api/routes');


//inistilise app with express
const app = express();

const users = require('./api/controllers/users.controller');
const events = require('./api/controllers/events.controller');

//variable for port
const port = 3000;

//middleware to log every request
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

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

app.use('/api', routes);

app.use('/users', users);


//start server
app.listen(port, () => {
  console.log('Server started on port ' + port);
})
