const mongoose = require('mongoose');
const Event = mongoose.model('Event');
const eventsModel = require('../models/events.model');

let runGeoQuery = (req, res) => {
  let lng = parseInt(req.query.lng);
  let lat = parseInt(req.query.lat);

  // a GeoJson point
  let point = {
    type : "Point",
    coordinates : [lng, lat]
  };
  let geoOptions = {
    spherical : true,
    maxDistance : 50000,
    num : 10
  };

  Event
   .geoNear(point, geoOptions, (err, results, stats) => {
     console.log('Geo results' , results);
     console.log('Geo stats' , stats);
     if(err){
       console.log(err);
       res
        .status(500)
        .json(err) ;
     }
     else{
       res
        .status(200)
        .json(results);
     }
   });
};

module.exports.eventsGetAll = (req, res) => {

  //slicing the data received from db for pagination
  let offset = 0;
  let count  = 10;
  let maxCount = 15;

  if(req.query && req.query.lat && req.query.lng){
    runGeoQuery(req, res);
    return;
  }
  if(req.query && req.query.offset){
    offset = parseInt(req.query.offset, 10);
  }
  if(req.query && req.query.count){
    count = parseInt(req.query.count, 10);
  }
  if(isNaN(count) || isNaN(offset)){
    res
     .status(400)
     .json({"message" : "count and offset should be numbers"});
    return;
  }
  if(count > maxCount){
    res
     .status(400)
     .json({"message" : "Count exceeds limit of " + maxCount + "!"});
     return;
  }

  Event
   .find()
   .skip(offset)
   .limit(count)
   .exec((err, events) => {
     if(err){
       console.log("Error finding events");
       res
        .status(500)
        .json(err);
     }
     else{
       console.log("Found events", events.length);
       res
       .status(200)
       .json(events);
     }
   });
};

module.exports.eventsGetOne = (req, res) => {

  let eventId = req.params.eventId;
  console.log("Get eventId", eventId);

  Event
   .findById(eventId)
   .exec((err, doc) => {
     let response = {
       status : 200,
       message : doc
     };
     if(err){
       console.log("Error finding Event");
       response.status = 500;
       response.message = err;
     }
     else if(!doc){
       console.log("eventId " + id + " not found in database");
       response.status = 404;
       response.message = {"message" : "Event not found"};
     }
     res
      .status(response.status)
      .json(response.message);
   });
};

let _splitArray = (input) => {
  let output;
  if(input && input.length > 0){
    output = input.slit(";");
  }
  else{
    output= []
  }
  return output;
};

module.exports.eventsAddOne = (req, res) => {
  Event
   .create({
     title : req.body.title,
     description : req.body.description,
     dateAndTime : req.body.dateAndTime,
     organisers : req.body.organisers,
     type: req.body.type,
     photos : _splitArray(req.body.photos),
     location : {
       address : req.body.address,
       coordinates : [parseFloat(req.body.lng), parseFloat(req.body.lat)]
     }
   }, (err, event) => {
     if(err){
       console.log("Error creating Event");
       res
        .status(400)
        .json(err);
     }
     else{
       console.log("Event created", event);
       res
        .status(201)
        .json(event);
     }
   });
}
module.exports.eventsUpdateOne = (req, res) => {
  let eventId = req.params.eventId;
  console.log("Get eventId", eventId);

  Event
   .findById(eventId)
   .select("-comments")
   .exec((err, doc) => {
     let response = {
       status : 200,
       message : doc
     };
     if(err){
       console.log("Error finding Event");
       response.status = 500;
       response.message = err;
     }
     else if(!doc){
       console.log("eventId " + id + " not found in database");
       response.status = 404;
       response.message = {"message" : "Event not found"};
     }
     if(response.status !== 200){
       res
        .status(response.status)
        .json(response.message);
     }
     else{
       doc.title = req.body.title;
       doc.description = req.body.description;
       doc.dateAndTime = req.body.dateAndTime;
       doc.organisers = req.body.organisers;
       doc.type = req.body.type;
       photos = _splitArray(req.body.photos);
       location = {
         address : req.body.address,
         coordinates : [parseFloat(req.body.lng), parseFloat(req.body.lat)]
       };
       doc.save((err, eventUpdated) => {
         if(err){
           res
            .status(500)
            .json(err);
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
