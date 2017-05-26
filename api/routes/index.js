const express = require('express');
const router  = express.Router();

const ctrlEvents = require('../controllers/events.controller');

router
 .route('/events')
 .get(ctrlEvents.eventsGetAll);

 router
  .route('/events/:eventId')
  .get(ctrlEvents.eventsGetOne);

  router
   .route('/events/new')
   .post(ctrlEvents.eventsAddOne);

module.exports = router;
