const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title : {
    type: String,
    required: true,
  },
  description : {
    type: String,
    required: true
  },
  organiser: String,
  photos: [String],
  dateTimeCreated: Date,

});

mongoose.model('Event', eventSchema, 'events');
