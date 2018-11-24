const mongoose = require('mongoose');

const spacecraftSchema = mongoose.Schema({
  name: {type: String, required: true},
  numberOfSeats: {type: Number, required: true},
  fuelTankCapacity: {type: Number, required: true},
  fuel: {type: Number, required: true},
  fuelConsumption: {type: Number, required: true},
  speed: {type: Number, required: true},
  maximumLoad: {type: Number, required: true},
  foodBoxCapacity: {type: Number, required: true},
});

module.exports = mongoose.model('Spacecraft', spacecraftSchema);
