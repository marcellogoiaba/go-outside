const mongoose = require('mongoose');
const Event = mongoose.model('Event');

module.exports.eventsGetAll = (req, res) => {
  let db = dbconn.get();
  let connection = db.collection('events');

  let offset = 0;
  let count  = 10;

  if(req.query && req.query.offset){
    offset = parseInt(req.query.offset, 10);
  }
  if(req.query && req.query.count){
    count = parseInt(req.query.count, 10);
  }

  collection
    .find()
    .skip(offset)
    .limit(count)
    .toArray((err, docs) => {
      console.log("Found events", docs);
      res
       .status(200)
       .json(docs);
    });
};

module.exports.eventsGetOne = (req, res) => {
  let db = dbconn.get();
  let collection = db.collection('events');

  let eventId = req.params.eventId;
  console.log("Get eventId", eventId);

}
