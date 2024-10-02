const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');
const Certificate = require('../models/certificate'); // Your certificate model
const checkRole = require('../middleware/checkRole');




// Route for handling participant requests 

router.get('/', checkRole('participant'), async (req, res) => {
  try {
    // Ensure the user is authenticated
    if (!req.oidc.isAuthenticated()) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
      console.log("hello")
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

router.get('/login', (req, res) => {
  console.log("Login route accessed");
  if (req.oidc.isAuthenticated()) {
      console.log("User is already authenticated");
      return res.redirect('/participant');
  }

  console.log("User not authenticated, initiating login");
  res.oidc.login({ 
    authorizationParams: { 
      prompt: 'login', 
      connection: 'participants', 
      state: '/participant' 
    } 
  });
});

// Handle callback logic from Auth0
router.get('/callback', (req, res) => {
  if (req.oidc.isAuthenticated()) {
    // If user is authenticated, redirect to the desired page
    return res.redirect(req.query.state || '/participant');
  } else {
    // Log errors for better debugging
    console.error('Authentication failed:', req.oidc);
    res.status(401).json({ message: 'User not authenticated' });
  }
});


router.get('/logout', (req, res) => {
  res.oidc.logout({
      returnTo: 'http://localhost:3000/', // Redirect after logout
      logoutParams: {
          federated: true, // This logs the user out of Auth0 and any other identity providers
      },
  });
});

module.exports = router;

