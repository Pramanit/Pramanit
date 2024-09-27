const express = require('express');
const router = express.Router();
const multer = require('multer');
const { auth } = require('express-openid-connect');
const cloudinary = require('cloudinary').v2;
const { requiresAuth } = require('express-openid-connect');
const dotenv = require('dotenv');
const auth0ConfigOrg = require('../auth0ConfigOrg');

//config integration
dotenv.config();


// Multer storage configuration
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

cloudinary.config({ 
  cloud_name: 'dl7rna1p6', 
  api_key: '922831872121692', 
  api_secret: '9cHuX1EL1aPTlSR7R9W8kTskB5M'
});

router.use(auth(auth0ConfigOrg));
router.get('/', requiresAuth(), (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});


router.post('/editInfo',auth(auth0ConfigOrg), async (req, res)=> {
  const file = req.file;

  if(file){
    cloudinary.uploader.upload_stream((error, result) => {
      if (error) {
        return res.status(500).send('Error uploading to Cloudinary: ' + error.message);
      }
          // Return the secure URL of the uploaded image
    res.status(200).send({ url: result.secure_url });
  }).end(file.buffer);
  }


  const uploadResult = await cloudinary.uploader
  .upload(
      'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
          public_id: 'shoes',
      }
  )
  .catch((error) => {
      console.log(error);
  });

console.log(uploadResult);

})
// Example: Create a new organization
router.post('/create', (req, res) => {
  // Logic for creating a new organization
  res.send('Organization created');
});

module.exports = router;