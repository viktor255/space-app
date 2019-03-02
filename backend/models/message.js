const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  userEmail: {type: String, required: true},
  spaceflightId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Spaceflight' },
  message: {type: String, required: true},
  timeStamp: {type: Number, required: true},
  photo: {type: Object}
});

module.exports = mongoose.model('Message', messageSchema);
