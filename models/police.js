const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create police Schema
const PoliceSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name of police is required']
  },
  rank: {
    type: String
  },
  station: {
    type: String
  }
});

const Police = mongoose.model('police', PoliceSchema);

module.exports = Police;
