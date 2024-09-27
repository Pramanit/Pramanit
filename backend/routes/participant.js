const express = require('express');
const router = express.Router();
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
const auth0ConfigParticipant = require('../auth0ConfigParticipant');



router.use(auth(auth0ConfigParticipant));
// Route for handling participant requests
router.get('/', requiresAuth(), (req, res) => {
  res.send('Participant home');
});

// Example: Register a new participant
router.post('/register', (req, res) => {
  // Logic for registering a new participant
  res.send('Participant registered');
});

module.exports = router;

