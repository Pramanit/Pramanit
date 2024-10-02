const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const certificateSchema = new mongoose.Schema({
  issuedBy: {
    type: String, // Name of the organization issuing the certificate, referenced from Org collection
    required: true,
    ref: 'Org'
  },
  issuerEmail: {
    type: String, // Email of the issuer, referenced from Org collection
    required: true,
    ref: 'Org',
    match: [/.+\@.+\..+/, 'Please enter a valid email address'] // Email format validation
  },
  issuedToEmail: {
    type: String, // Email of the recipient (participant), referenced from Participant collection
    required: true,
    ref: 'Participant',
    match: [/.+\@.+\..+/, 'Please enter a valid email address']
  },
  eventId: {
    type: String, // ID of the event, referenced from Event collection
    required: true,
    ref: 'Event'
  },
  eventName:{
    type: String,
    required: true,
    ref: 'Event'
  },
  participantName: {
    type: String,
    required: true,
    trim: true
  },
  prize: {
    type: String,
    required: true
  },
  dateTime: {
    type: Date,
    required: true
  },
  verificationId: {
    type: String,
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = Certificate;
