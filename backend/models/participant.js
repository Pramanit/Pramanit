const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  publicKey: {
    type: String,
    required: true
  },
  privateKey: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address']
  }
}, {
  timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
});

const Participant = mongoose.model('Participant', participantSchema);

module.exports = Participant;
