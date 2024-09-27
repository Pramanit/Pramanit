const express = require('express');
const router = express.Router();
const multer = require('multer');
const { auth } = require('express-openid-connect');
const cloudinary = require('cloudinary').v2;
const { requiresAuth } = require('express-openid-connect');
const dotenv = require('dotenv');
const auth0ConfigOrg = require('../auth0ConfigOrg');
const Org = require("../models/org");
const Event = require("../models/event");
const DiamSdk = require("diamnet-sdk");
const axios = require('axios');
const Certificate = require("../models/certificate")
const Participant = require("../models/participant")
const encrypt = require("../utils.js/encrypt")

const server = new DiamSdk.Aurora.Server("https://diamtestnet.diamcircle.io/");



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


  router.get('/', requiresAuth(), async (req, res) => {
    const email = req.oidc.user.email; // Ensure req.oidc contains the email
    const name = req.oidc.user.name; // Ensure req.oidc contains the name

    console.log("Email:", email); // Check if email is available
    console.log("Name:", name); // Check if name is available

    try {
      // Check if the organization with this email already exists
      let org = await Org.findOne({ email });

      if (!org) {
        console.log("111")
        // If no organization is found, create a new one

        // create a completely new and unique pair of keys
        const pair = DiamSdk.Keypair.random();
        const privateKey = pair.secret();
        const publicKey = pair.publicKey();
        org = new Org({
          name: name,     // Ensure you are sending `name` in the request body
          publicKey: publicKey, // Ensure you are sending `publicKey` in the request body
          privateKey: privateKey, // Ensure you are sending `privateKey` in the request body
          email: email,                     // Authenticated user's email
        });

        // Save the new organization to the database
        await org.save();
        try {
          console.log("11")
          const response = await axios.get(
            `https://friendbot.diamcircle.io?addr=${encodeURIComponent(publicKey)}`
          );
          console.log("22")
          const responseJSON = response.data;
          console.log("33")
          console.log("SUCCESS! You have a new account :)\n", responseJSON);
         

        } catch (e) {
          console.error("ERROR!", e);
          res.status(500).json({ message: e.message });
        }
        
      }
      let orgDetails = await Org.findOne({email});
      let EventDetails = await Event.findOne({organisedBy: email});
      console.log("44")
      res.status(200).json({ message: 'Organization is verified.', org: orgDetails, events: EventDetails });
      
    } catch (error) {
      console.error('Error processing request:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  });


//to be done later
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

// tested
router.post("/createEvent", requiresAuth(), async (req, res)=> {
  const eventName = req.body.eventName;
  const eventDescription = req.body.eventDescription;
  const dateTime = req.body.dateTime;

  try {
    const newEvent = new Event({
      organisedBy: req.oidc.user.email,
      eventName: eventName,
      description: eventDescription,
      dateTime: dateTime,
    })

  const savedEvent = await newEvent.save();

    res.redirect(`/org/event/${savedEvent.eventId}`)
  } catch(e) {
    console.log("error in /creatEvent", e.message)
    res.status(500).json({msg: e.message, error:true })
  }
})


// tested
router.get("/event/:eventId", requiresAuth(), async (req, res) => {

  const { eventId } = req.params;
  const email = req.oidc.user.email;

  try {
    const event = await Event.findOne({ eventId, organisedBy: email });

    if (!event) {
      return res.status(404).json({ message: 'Event not found or you do not have access' });
    }

    res.status(200).json({
      message: 'Event details retrieved successfully',
      event,
    });
  } catch (e) {
    console.error('Error fetching event:', error);
    res.status(500).json({ message: 'Error fetching event', error });
  }

})


// testing
router.post("/event/:eventId/createCertificate", requiresAuth(), async (req, res)=> {
  const email = req.oidc.user.email;
  const eventId = req.params.eventId;
  const issueToName = req.body.name;
  const issuedToEmail = req.body.email;
  const prize = req.body.prize;
  const dateTime = req.body.dateTime;
  let verificationId;
 

      // Validate input fields
      if (!issueToName || !issuedToEmail || !prize || !dateTime) {
        return res.status(400).json({ error: true, msg: "Missing required fields" });
    }

  try{

  //check and crerate key pairs for participant id;
  const recievingAcc = await Participant.findOne({email: issuedToEmail})
  
  let receivingKeyPair;

  if(!recievingAcc){
    console.log("11")
    const receivingKeys = DiamSdk.Keypair.random(); // Generate a new keypair

      const recievingSecret = receivingKeys.secret();
      const recievingPublicKey = receivingKeys.publicKey();
      const newParticipant = new Participant({
      name:issueToName,
      email: issuedToEmail,
      publicKey: recievingPublicKey,
      privateKey: recievingSecret,
    })
    // account saved in db
    await newParticipant.save();

    // account funded
    const response = await axios.get(
      `https://friendbot.diamcircle.io?addr=${encodeURIComponent(receivingKeys.publicKey())}`
    );
    console.log("22")
    const responseJSON = response.data;
    console.log("33")
    console.log("SUCCESS! You have a new account :)\n", responseJSON);
    receivingKeyPair = DiamSdk.Keypair.fromSecret(recievingSecret);
  } else {
    receivingKeyPair = DiamSdk.Keypair.fromSecret(recievingAcc.privateKey);
  }


  // get issuers keys

  const issuerDetails = await Org.findOne({email});
  console.log(issuerDetails)

  const assetData = JSON.stringify({
    issuerEmail: email,
    issuedToEmail,
    eventId,
    participantName: issueToName,
    prize,
    dateTime,
  });



  const issuingKeyPair = DiamSdk.Keypair.fromSecret(issuerDetails.privateKey);

  const assetName = `Cert${issueToName.slice(0, 2)}${eventId.slice(0, 2)}`;
  const certificateAsset = new DiamSdk.Asset(assetName, issuingKeyPair.publicKey());



  //**
  console.log("Starting transaction process");


  // Load the receiving account
  await server
    .loadAccount(receivingKeyPair.publicKey())
    .then(function (receiver) {
      console.log("Loaded receiving account");
  
      // Build the transaction for the receiving account
      var transaction = new DiamSdk.TransactionBuilder(receiver, {
        fee: 100,
        networkPassphrase: DiamSdk.Networks.TESTNET,
      })
        .addOperation(
          DiamSdk.Operation.changeTrust({
            asset: certificateAsset,
            limit: "1000",
          })
        )
        .setTimeout(100) // setTimeout is required for transactions
        .build();
  
      // Sign the transaction with the receiving keypair
      transaction.sign(receivingKeyPair);  // Use the Keypair object, not secret
  
      // Submit the transaction
      return server.submitTransaction(transaction);
    })
    .then(function (response) {
      console.log("Change trust transaction successful:", response);
  
      // Load the issuing account
      return server.loadAccount(issuingKeyPair.publicKey());
    })
    .then(function (issuer) {
      console.log("Loaded issuing account");
  
      // Build the transaction for the issuing account
      var transaction = new DiamSdk.TransactionBuilder(issuer, {
        fee: 100,
        networkPassphrase: DiamSdk.Networks.TESTNET,
      })
        .addOperation(
          DiamSdk.Operation.payment({
            destination: receivingKeyPair.publicKey(),
            asset: certificateAsset,
            amount: "10",
          })
        )
        .addMemo(DiamSdk.Memo.text(`${encryptedCert}`))
        .setTimeout(100) // setTimeout is required for transactions
        .build();
  
      // Sign the transaction with the issuing keypair
      transaction.sign(issuingKeyPair);  // Use the Keypair object, not secret
  
      // Submit the transaction
      return server.submitTransaction(transaction);
    })
    .then(function (result) {
      console.log("Payment successful. Transaction hash:", result.hash);
      verificationId = result.hash;
    })
    .catch(function (error) {
      console.error("Error!", error);
    });
  //**

  //create certificate
    const org = await Org.findOne({email})

    const newCertificate = new Certificate({
      issuedBy: org.name,
      issuerEmail: email,
      issuedToEmail: issuedToEmail,
      eventId: eventId,
      participantName: issueToName,
      prize,
      dateTime,
      verificationId: verificationId
    });
    await newCertificate.save();

    // Send the asset details in response
    res.status(200).json({ success: true, verificationId: verificationId });

    //send email to participant

  } catch (e) {
    console.error("Error processing request:", e);
    res.status(500).json({error:true, msg: e.message});
  }


})

router.get("/verify/:verificationId", async (req, res)=> {

  const verificationId = req.params.verificationId;
  
  try {


  const transactionDetails = await server
  .transactions()
  .transaction(verificationId)
  .call();

  console.log("Asset details retrieved:", transactionDetails);
  res.status(200).json({success:true, msg:transactionDetails});
} catch (e) {
  console.log(e)
  res.status(500).json({error:true, msg:e.message})
}

})

module.exports = router;