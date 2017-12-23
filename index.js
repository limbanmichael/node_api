const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set up express app
const app = express();

// connect to mongodb
var uri = 'mongodb://michael:Michael1993@ds163826.mlab.com:63826/node_api';
mongoose.connect(uri, {
  useMongoClient: true,
});
// mongoose.connect(process.env.MONGODB_URI, function(error) {
//     if (error) console.error(error);
//     else console.log('mongo connected');
// });

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
app.listen(process.env.PORT || 4000, function (){
  console.log('now listening for request hey hey');
});
