const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');
const Police = require('../models/police');
// const User = require('../models/users');
const jwt = require('jsonwebtoken');

function ensureToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

// get all documents from ninja collection
router.get('/protected/ninjas', ensureToken, function(req, res){
  jwt.verify(req.token, 'my_secret_key', function(err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      Ninja.find({}).then(function(ninja){
        res.send(ninja);
      });
    }
  });
});


// get a specific document from collection
router.get('/protected/ninjas/:name', ensureToken, function(req, res, next){
  jwt.verify(req.token, 'my_secret_key', function(err, data){
    if (err) {
      res.sendStatus(403);
    } else {
      // make the name case insensitive
      const regex = new RegExp(["^", req.params.name, "$"].join(""), "i");
      Ninja.find({ 'name': regex }, 'name rank available', function (err, ninja) {
        if (err) {
          res.send({error: "No data"});
        }
        // 'Ninjas' contains the list of athletes that match the criteria.
        res.send(ninja);
      });
    }
  });
});

// add a new ninja to db
router.post('/protected/ninjas', ensureToken, function(req, res, next){
  jwt.verify(req.token, 'my_secret_key', function(err, data){
    if (err) {
      res.sendStatus(403);
    } else {
      Ninja.create(req.body).then(function(ninja){
        res.send(ninja);
      }).catch(next);
    }
  });
  // var myData = new Ninja(req.body);
  // myData.save()
  //   .then(item => {
  //     res.send("item saved to database");
  //   })
  //   .catch(err => {
  //     res.status(400).send("unable to save to db");
  //   });
});

router.post('/police', function(req, res, next){
  Police.create(req.body).then(function(police){
    res.send(police);
  }).catch(next);
});

// update a ninja in db
router.put('/ninjas/:id', ensureToken, function(req, res, next){
  jwt.verify(req.token, 'my_secret_key', function(err, data){
    if (err) {
      res.sendStatus(403);
    } else {
      Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(ninja){
        Ninja.findOne({_id: req.params.id}).then(function(ninja){
          res.send(ninja);
        });
      });
    }
  });
});

// delete a ninja from db
router.delete('/ninjas/:id', function(req, res, next){
  Ninja.findByIdAndRemove({_id: req.params.id}).then(function(ninja){
    res.send(ninja);
  });
});

// login
router.post('/login', function(req, res, next){
  const user = {id: 3};
  const token = jwt.sign({ user }, 'my_secret_key');
  res.json({
    token: token
  });
})

module.exports = router;
