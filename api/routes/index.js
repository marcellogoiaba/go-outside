const express = require('express');
const router  = express.Router();

const ctrlEvents = require('../controllers/events.controller');
const ctrlComments = require('../controllers/comments.controller');

//Event routes
router
 .route('/events')
 .get(ctrlEvents.eventsGetAll);
router
 .route('/events/:eventId')
 .get(ctrlEvents.eventsGetOne);

router
 .route('/events/new')
 .post(ctrlEvents.eventsAddOne);

//Comment routes
router
 .route('/events/:eventId/comments')
 .get(ctrlComments.commentsGetAll);
router
 .route('/events/:eventId/comments/:commentId')
 .get(ctrlComments.commentsGetOne);

module.exports = router;
