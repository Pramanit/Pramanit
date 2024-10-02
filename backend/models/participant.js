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
  },
  password: {
    type: String,
    select: false
  },
  role: {
    type: String,
    defualt: "participant"
      },
  emailVerification: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true 
});

const Participant = mongoose.model('Participant', participantSchema);

module.exports = Participant;
