const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  createdOn: {
    type:Date,
    "default": Date.now
  },
  author: String,
  likes: {
    type: Number,
    min: 0,
    "default": 0
  }
});

const eventSchema = new mongoose.Schema({
  title : {
    type: String,
    required: true,
  },
  description : {
    type: String,
    required: true
  },
  dateAndTime: Date,
  location: {
    type: String,
    required: true
  },
  organisers: [String],
  photos: [String],
  location: {
    address:String,
    coordinates: {
      type: [Number],
      index: '2dsphere'
    }
  },// always store coordinate Longtude first (E/W), then Latitude (N/S)
  createdOn: {
    type: Date,
    "default": Date.now
  },
  likes: {
    type: Number,
    min: 0,
    "default": 0
  },
  comments:[commentSchema]
});

mongoose.model('Event', eventSchema, 'events');
