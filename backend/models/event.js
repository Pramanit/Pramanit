const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const eventSchema = new mongoose.Schema({
  organisedBy: {
    type: String, // Storing the email of the organizer from the Org collection
    required: true,
    ref: 'Org', // Reference to the Org model (email field)
    match: [/.+\@.+\..+/, 'Please enter a valid email address'] // Email format validation
  },
  eventName: {
    type: String,
    required: true,
    trim: true
  },
  dateTime: {
    type: Date,
    required: true
  },
  eventId: {
    type: String,
    default: uuidv4, // Automatically generate UUID for the event
    unique: true
  },
  description: {
    type: String,
    required: true
  },
}, {
  timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;


