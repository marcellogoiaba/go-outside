const mongoose = require('mongoose');
const Event = mongoose.model('Event');
const eventsModel = require('../models/events.model');
const dbconn = require('../config/dbConnect');

module.exports.eventsGetAll = (req, res) => {

  //slicing the data received from db for pagination
  let offset = 0;
  let count  = 10;

  if(req.query && req.query.offset){
    offset = parseInt(req.query.offset, 10);
  }
  if(req.query && req.query.count){
    count = parseInt(req.query.count, 10);
  }

  Event
   .find()
   .skip(offset)
   .limit(count)
   .exec((err, events) => {
     console.log("Found events", events.length);
     res
     .status(200)
      .json(events);
   });
};

module.exports.eventsGetOne = (req, res) => {

  let eventId = req.params.eventId;
  console.log("Get eventId", eventId);

  Event
   .findById(eventId)
   .exec((err, doc) => {
     res
      .status(200)
      .json(doc);
   });
};

module.exports.eventsAddOne = (req, res) => {
  console.log("POST new event");;
  console.log(req.body);;
  res
   .status(200)
   .json(req.body);
}
