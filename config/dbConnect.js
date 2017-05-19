const config = require('./database');
const mongoose = require('mongoose');

mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
  console.log('Connected to db ' + config.database);
});
mongoose.connection.on('disconnected', () => {
  console.log('Database disconnected');
});
mongoose.connection.on('error', (err) => {
  console.log('Connection to db failed, Error '+ err);
});

process.on('SIGINT',() => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected through app termination (SIGINT)');
    process.exit(0);
  });
});

process.on('SIGTERM',() => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected through app termination (SIGTERM)');
    process.exit(0);
  });
});

process.once('SIGUSR2', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected through app termination (SIGUSR2)');
    process.kill(process.pid, 'SIGUSR2');
  });
});

//bring in event Schema
require('./events.model');
