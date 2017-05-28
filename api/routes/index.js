const express = require('express');
const router  = express.Router();

const ctrlEvents = require('../controllers/events.controller');
const ctrlComments = require('../controllers/comments.controller');

//Event routes
router
 .route('/events')
 .get(ctrlEvents.eventsGetAll)
 .post(ctrlEvents.eventsAddOne);
router
 .route('/events/:eventId')
 .get(ctrlEvents.eventsGetOne);

//Comment routes
router
 .route('/events/:eventId/comments')
 .get(ctrlComments.commentsGetAll)
 .post(ctrlComments.commentsAddOne);
router
 .route('/events/:eventId/comments/:commentId')
 .get(ctrlComments.commentsGetOne);

module.exports = router;
