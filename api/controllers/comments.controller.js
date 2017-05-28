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
      let response = {
        status : 200,
        message : []
      };
      if(err){
        console.log("Error finding event");
        response.status = 500;
        response.message = err;
      }
      else if(!doc){
        console.log("Hotel not found in database", eventId);
        response.status = 404;
        response.message = {"message" : "eventId not found " + eventId};
      }
      else{
        response.message = doc.comments ? doc.comments : [];
      }
      console.log("returned doc", doc);
      res
       .status(200)
       .json(doc.comments);
    });
 };

//get a single review for an event
 module.exports.commentsGetOne = (req, res) => {
   let eventId = req.params.eventId;
   let commentId = req.params.commentId;
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

 let _addComment = (req, res, event) => {
   event.commnets.push({
      comment : req.body.comment,
      author : req.body.author
   });
   event.save((err, eventUpdated) => {
     if(err){
       res
        .status(500)
        .json(err);
     }
     else{
       res
        .status(201)
        .json(eventUpdated.comments[eventUpdated.comments.length - 1]);
     }
   })
 }

module.exports.commentsAddOne = (req, res) => {
  let eventId = req.params.eventId;
  console.log("Get eventId", eventId);

  Event
   .findById(eventId)
   .select('comments')
   .exec((err, doc) => {
     let response = {
       status : 200,
       message : []
     };
     if(err){
       console.log("Error finding event");
       response.status = 500;
       response.message = err;
     }
     else if(!doc){
       console.log("eventId not found," + id);
       response.status = 400;
       response.message = {"message" : "eventId not found " + id };
     }
     if(doc){
       _addComment(req, res, doc);
     }
     res
      .status(response.status)
      .json(response.message)
    });
};
