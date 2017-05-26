const express = require('express');
const router  = express.Router();

router
 .route('/json')
 .get((req, res) => {
   console.log("Get the json");
   res
    .status(200)
    .json({"jsonData" : true});
 })
 .post((req, res) => {
   console.log("POST the json");
   res
    .status(200)
    .json({"jsonData" : "POST received"});
 });


module.exports = router;
