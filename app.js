const express = require('express')
const YelpKey = require('./secrets')
const ExpressError = require("./ExpressError");
const axios = require ('axios')
const yelpcalls = require('./routes/yelpcalls')
const cors = require('cors');



const app = express()

app.use(express.json())
app.use(cors())
app.use('/api', yelpcalls);

/** 404 handler */

app.use(function(req, res, next) {
    const err = new ExpressError("Not Found", 404);
  
    // pass the error to the next piece of middleware
    return next(err);
  });
 




/** general error handler */

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.error(err.stack);
  
    return res.json({
      status: err.status,
      message: err.message
    });
  });

module.exports = app 