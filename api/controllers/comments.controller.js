const mongoose = require('mongoose');
const Event = mongoose.model('Event');

//Get all the reviews for an event
 module.exports.commentsGetAll = (req, res) => {
   let eventId = req.params.eventId;
   console.log("Get eventId", eventId);

   Event
    .findById(eventId)
    .select('comments')
    .exec((err, doc) => {
      console.log("returned doc", doc);
      res
       .status(200)
       .json(doc.comments);
    });
 };

//get a single review for an event
 module.exports.commentsGetOne = (req, res) => {
   let eventId = req.params.eventId;
   let commentId = req.params.eventId;
   console.log("Get commentId " + commentId + " for eventId " + eventId);

   Event
    .findById(eventId)
    .select('comments')
    .exec((err, event) => {
      console.log("returned event", event);
      let comment = event.comments.id(commentId);
      res
       .status(200)
       .json(comment);
    });
 };
