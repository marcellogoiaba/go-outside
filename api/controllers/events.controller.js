const mongoose = require('mongoose');
const Event = mongoose.model('Event');
const eventsModel = require('../models/events');
// const dbconn = require('../../config/dbConnect');
const eventData = require('../data/event-data');

module.exports.eventsGetAll = (req, res) => {
  // let db = dbconn.get();
  // let connection = db.collection('events');

  //slicing the data received from db for pagination
  let offset = 0;
  let count  = 10;

  if(req.query && req.query.offset){
    offset = parseInt(req.query.offset, 10);
  }
  if(req.query && req.query.count){
    count = parseInt(req.query.count, 10);
  }

  let returnData = eventData.slice(offset, offset+count);

  // collection
  //   .find()
  //   .skip(offset)
  //   .limit(count)
  //   .toArray((err, docs) => {
  //     console.log("Found events", docs);
  //     res
  //      .status(200)
  //      .json(docs);
  //   });
  console.log("GET the events");
  console.log(req.query);
  res
   .status(200)
   .json(returnData)
};

module.exports.eventsGetOne = (req, res) => {
  // let db = dbconn.get();
  // let collection = db.collection('events');

  let eventId = req.params.eventId;
  let thisEvent = eventData[eventId];
  console.log("Get eventId", eventId);
  res
   .status(200)
   .json(thisEvent);

};

module.exports.eventsAddOne = (req, res) => {
  console.log("POST new event");;
  console.log(req.body);;
  res
   .status(200)
   .json(req.body);
}
