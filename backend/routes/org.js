const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

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

// Route for handling organization requests
router.get('/', (req, res) => {
  res.send('Organization home');
});

router.post('/editInfo', async (req, res)=> {
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