const express = require('express');
const router = express.Router();
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
const auth0ConfigParticipant = require('../auth0ConfigParticipant');
const Certificate = require('../models/certificate'); // Your certificate model


router.use(auth(auth0ConfigParticipant));
// Route for handling participant requests
router.get('/', requiresAuth(), async (req, res) => {
  try {
    // Ensure the user is authenticated
    if (!req.oidc.isAuthenticated()) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Get the user's email from the Auth0 profile
    const userEmail = req.oidc.user.email;

    // Query the database for certificates issued to the logged-in user
    const certificates = await Certificate.find({ issuedToEmail: userEmail });

    // If no certificates are found
    if (!certificates.length) {
      return res.status(404).json({ message: 'No certificates found for this user' });
    }

    // Return the found certificates
    res.status(200).json(certificates);
  } catch (error) {
    // Handle errors
    console.error('Error fetching certificates:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;

