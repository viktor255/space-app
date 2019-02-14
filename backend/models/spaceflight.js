const mongoose = require('mongoose');

const spaceflightSchema = mongoose.Schema({
  distance: {type: Number, required: true},
  startTime: {type: Number, required: true},
  isStarted: {type: Boolean, required: true},
  spacecraft: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Spacecraft' },
  cosmonauts: [{ type: String, required: true}]
});

module.exports = mongoose.model('Spaceflight', spaceflightSchema);
