const express = require('express');
const router = express.Router();

// Route for handling participant requests
router.get('/', (req, res) => {
  res.send('Participant home');
});

// Example: Register a new participant
router.post('/register', (req, res) => {
  // Logic for registering a new participant
  res.send('Participant registered');
});

module.exports = router;

