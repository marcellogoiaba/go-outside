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
   event.comments.push({
     comment : req.body.comment,
     author : req.body.author,
   });
   event.save((err, eventUpdated) => {
     if(err){
       res
        .status(500)
        .json(err);
     }
     else{
       res
        .status(200)
        .json(eventUpdated.comments[eventUpdated.comments.length - 1]) ;
     }
   });
 };

module.exports.commentsAddOne = (req, res) => {
  let eventId = req.params.eventId;
  console.log("POST comment to eventId", eventId);

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
       console.log("eventId not found," + eventId);
       response.status = 400;
       response.message = {"message" : "eventId not found " + eventId };
     }
     if(doc){
       _addComment(req, res, doc);
     }
     else{
       res
        .status(response.status)
        .json(response.message);
     }
  });
};

module.exports.commentsUpdateOne = (req, res) => {
  let eventId = req.params.eventId;
  let commentId = req.params.commentId;
  console.log("PUT commentId " + commentId + " for eventId " + eventId);

  Event
   .findById(eventId)
   .select('comments')
   .exec((err, event) => {
     console.log("returned event", event);
     let thisComment;
     let response ={
       status : 200,
       message : {}
     };
     if(err){
       console.log("Error finging event");;
       response.status = 500;
       response.message = err;
     }
     else if(!event){
       console.log("Event not found in database", eventId);
       response.status = 404;
       response.message = {"message" : "Event ID not found "  + eventId};
     }
     else{
       // retrieve the commentId
       thisComment = event.comments.id(commentId);
       // mongoose will return null if the comment does not exist
       if(!thisComment){
         response.status = 404;
         response.message = {"message" : "Comment ID " + eventId + " not found"};
       }
     }
     if(response.status !== 200){
       res
        .status(response.status)
        .json(response.message);
     }
     else{
       thisComment.comment = req.body.comment;
       thisComment.author = req.body.author;
       event.save((err, eventUpdated) => {
         if(err){
           res
            .status(500)
            .json(err)
         }
         else{
           res
            .status(204)
            .json();
         }
       });
     }
   });
};

module.exports.commentsDeleteOne =  (req, res) => {
  let eventId = req.params.eventId;
  let commentId = req.params.commentId;
  console.log("PUT commentId " + commentId + " for eventId " + eventId);

  Event
   .findById(eventId)
   .select('comments')
   .exec((err, event) => {
     console.log("returned event", event);
     let thisComment;
     let response ={
       status : 200,
       message : {}
     };
     if(err){
       console.log("Error finging event");;
       response.status = 500;
       response.message = err;
     }
     else if(!event){
       console.log("Event not found in database", eventId);
       response.status = 404;
       response.message = {"message" : "Event ID not found "  + eventId};
     }
     else{
       // retrieve the commentId
       thisComment = event.comments.id(commentId);
       // mongoose will return null if the comment does not exist
       if(!thisComment){
         response.status = 404;
         response.message = {"message" : "Comment ID " + eventId + " not found"};
       }
     }
     if(response.status !== 200){
       res
        .status(response.status)
        .json(response.message);
     }
     else{
       event.comments.id(commentId).remove();
       event.save((err, eventUpdated) => {
         if(err){
           res
            .status(500)
            .json(err)
         }
         else{
           res
            .status(204)
            .json();
         }
       });
     }
   });
}
