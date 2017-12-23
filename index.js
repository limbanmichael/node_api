const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set up express app
const app = express();

// connect to mongodb
mongoose.connect(MONGODB_URI, {
  useMongoClient: true,
});
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

// initialize routes
app.use('/api', require('./routes/api'));
app.use('/user', require('./routes/userRoute'));

// error handling middleware
app.use(function(err, req, res, next){
  // console.log(err);
  res.status(422).send({error: err.message});
});

// listen for request
app.listen(process.env.PORT || port, function (){
  console.log('now listening for request hey hey');
});
