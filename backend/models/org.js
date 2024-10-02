const mongoose = require('mongoose');

const orgSchema = new mongoose.Schema({
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
  logoUrl: {
    type: String,
    required: false // Optional if not every org has a logo
  },
  verified: {
    type: Boolean,
    default: false // Default value is false
  },
  password: {
    type: String,
    required: true.valueOf,
    select: false
  },
  role: {
type: String,
defualt: "organization"
  }
}, {
  timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
});

const Org = mongoose.model('Org', orgSchema);

module.exports = Org;
