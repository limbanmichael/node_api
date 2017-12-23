const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create ninja schema and models
const NinjaSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name field is required']
  },
  rank: {
    type: String
  },
  available: {
    type: Boolean,
    default: false
  }
  // add in geo location
});

const Ninja = mongoose.model('ninja', NinjaSchema);

module.exports = Ninja;
