const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a user schema and models
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name field is required']
  },
  username: {
    type: String,
    required: [true, 'username is required']
  },
  password: {
    type: String,
    required: [true, 'password is reqiured']
  },
  email: {
    type: String,
    required: [true, 'email is required']
  }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
