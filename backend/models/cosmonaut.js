const mongoose = require('mongoose');

const cosmonautSchema = mongoose.Schema({
  email: {type: String, required: true},
  name: {type: String, required: true},
  dateOfBirth: {type: String, required: true},
  weight: {type: Number, required: true},
  foodConsumption: {type: Number, required: true}
});

module.exports = mongoose.model('Cosmonaut', cosmonautSchema);
