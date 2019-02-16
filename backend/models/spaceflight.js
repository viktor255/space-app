const mongoose = require('mongoose');

const spaceflightSchema = mongoose.Schema({
  distance: {type: Number, required: true},
  startTime: {type: Number, required: true},
  isStarted: {type: Boolean, required: true},
  spacecraftId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Spacecraft' },
  cosmonautsIds: [{ type: String, required: true}]
});

module.exports = mongoose.model('Spaceflight', spaceflightSchema);
