const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const inviteSchema = new mongoose.Schema({
  inviteId: {
    type: String,
    default: uuidv4, // Automatically generate UUID for the invite
    unique: true
  },
  receiverEmail: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'] // Email format validation
  },
  senderName: {
    type: String,
    required: true,
    trim: true
  },
  eventName: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
});

const Invite = mongoose.model('Invite', inviteSchema);

module.exports = Invite;
