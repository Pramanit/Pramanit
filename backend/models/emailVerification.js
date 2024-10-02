const mongoose = require('mongoose');

// Function to generate a short alphanumeric string (e.g., for OTP)
function generateOTP(length = 6) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}


const emailVerificationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  otp: {
    type: String,
    required: true,
    default: () => generateOTP(6)
  },
  role: {
    type: String,
    required: true,
    enum: ["participant", "organization"]
  }
});

EmailVerification = mongoose.model('EmailVerification', emailVerificationSchema);

module.exports = EmailVerification;