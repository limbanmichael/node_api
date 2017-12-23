const express = require('express');
const userRouter = express.Router();
const User = require('../models/users');
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

userRouter.post('/protected/person', ensureToken, function(req, res, next){
  jwt.verify(req.token, 'my_secret_key', function(err, data){
    if (err) {
      res.sendStatus(403);
    } else {
      User.create(req.body).then(function(user){
        res.send(user);
      }).catch(next);
    }
  });
});

// login
userRouter.post('/protected/login', function(req, res, next){
  const user = {id: 3};
  const token = jwt.sign({ user }, 'my_secret_key');
  res.json({
    token: token
  });
})

module.exports = userRouter;
