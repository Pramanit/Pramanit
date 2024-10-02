const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { requiresAuth } = require('express-openid-connect');
const Certificate = require('../models/certificate'); // Your certificate model
const DiamSdk = require("diamnet-sdk");
const Participant = require('../models/participant');
const EmailVerification = require('../models/emailVerification');
const checkRole = require('../middleware/checkRole');
const verifyToken = require('../middleware/verifyToken');
const axios = require = require('axios');
const server = new DiamSdk.Aurora.Server("https://diamtestnet.diamcircle.io/");



// Route for handling participant requests 

router.get('/',verifyToken, checkRole(("participant")), async (req, res) => {
  try {
    // Ensure the user is authenticated
      console.log("hello")
    const userEmail = req.user.email;

    // Query the database for certificates issued to the logged-in user
    const certificates = await Certificate.find({ issuedToEmail: userEmail });

    // If no certificates are found
    if (!certificates.length) {
      return res.status(200).json({ message: 'No certificates found for this user', count:"0" });
    }
    response = {
      certificates: certificates,
      email: req.user.email,
      name: req.user.name,
    }
    // Return the found certificates
    res.status(200).json(response);
  } catch (error) {
    // Handle errors
    console.error('Error fetching certificates:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res)=> {
   const { email, password } = req.body;
  
   try{
   const participant = await Participant.findOne({email});
    console.log(participant);
   if(!participant){
     return res.status(404).json({message: "User not found"})
   }
   if(!participant.password){
    return res.json({message:"please register first"})
   }

   if(participant.emailVerification === false){
    return res.status(400).json({message:"This email is not  verified yet"})
   }
   const isMatch = await bcrypt.compare(password, participant.password);
   if(!isMatch){
    return res.status(400).json({message:"INVALID INPUTS/INPUT"})
   }

   const token = jwt.sign({email: participant.email, role:"participant", name:participant.name}, process.env.JWT_SECRET, {expiresIn: "1h"});

   res.status(200).json({token: token});
  } catch (e) {
    return res.status(500).json({error:true, message:"Server Error"});
  }


})

router.post('/register', async (req, res) => {
   const { name, email, password } = req.body;
   const hashedPassword = await bcrypt.hash(password, 10);
   const receivingKeys = DiamSdk.Keypair.random(); // Generate a new keypair

   const recievingSecret = receivingKeys.secret();
   const recievingPublicKey = receivingKeys.publicKey();
try {
   const newParticipant = new Participant({
    name: name,
    email: email,
    publicKey: recievingPublicKey,
    privateKey: recievingSecret,
    password: hashedPassword,
   })
   await newParticipant.save();
    // account funded
    const response1 = await axios.get(
      `https://friendbot.diamcircle.io?addr=${encodeURIComponent(receivingKeys.publicKey())}`
    );
    console.log("22")
    const responseJSON = response1.data;
    console.log("33")
    console.log("SUCCESS! You have a new account :)\n", responseJSON);
   const newEmailVerification = new EmailVerification({
    email: email,
    role: "participant"
   })
   const savedEnrtyToEmailVerification = await newEmailVerification.save();

   const verificationId = savedEnrtyToEmailVerification.otp;

   
   //send verification email (usePlunk)
   const to = `${email}`;
    const subject = `Your OTP for PRAMANIT`;
    const bodyContent = `
    <div style="width: 600px; height: auto; border: 1px solid #000; padding: 20px; box-sizing: border-box; position: relative;">
        <!-- Space for logo at the top -->
        <div style="height: 60px; padding:10px 10px 10px 0px ">
        <img src="https://pramanit.co/logo.jpg" alt="logo of Pramanit" style="border-radius: 15px; padding: 5px; width: 60px; height: auto;">
        </div>
                <!-- Horizontal line for separation -->
            <hr style="border: 1px solid #ccc; margin: 20px 0;">
        <div>
            <div style="font-weight: bold; font-size: 1.6em; line-height: 1.2em; margin-botton: 10px">
                <p style="margin: 0;">Heyy</p>
                <p style="margin: 0;">(${email})</p>
                <p style="margin: 0;">Your OTP is ${verificationId}</p>
            </div>

            <p>Please do not share with anybody</p>
           
        </div>
    </div>
    `;
    const subscribed = true;
    const nameOfCompany = 'Pramanit';
    const headers = {};
    
    // Properly stringify the requestBody object
    const requestBody = JSON.stringify({
        to: to,
        subject: subject,
        body: bodyContent,
        subscribed: subscribed,
        name: nameOfCompany,
        headers: headers,
        metadata:{
          accountType: "participant"
        }
    });
    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.USE_PLUNK_API_KEY}`
        },
        body: requestBody
    };
    
    
        const response = await fetch('https://api.useplunk.com/v1/send', options);
        const data = await response.json();
        console.log(data); 


   //response
   res.status(200).json({message:"An Email verification otp has been sent to your inbox"});
  }
  catch(e){
    console.log("error in registering");
    res.status(500).json({error:"error in registering", message: e.message})
  }

})

router.post('/verifyEmail', async (req, res)=>{
  const { email, otp } = req.body;
 try{
  const verificationParticipant = await EmailVerification.findOne({email: email, role:"participant"});
  console.log("Verification Participant:", verificationParticipant);
  console.log("Provided OTP:", otp);
  
  if (!verificationParticipant) {
    return res.status(400).json({ error: true, message: "No verification record found" });
  }

  if(verificationParticipant.otp !== otp){
    return res.status(400).json({error: true, message: "wrong otp"});
  }
  if(verificationParticipant.role !== "participant"){
    return res.status(400).json({error: true, message: "unauthorized"});
  }
  
    
    const newP = await Participant.findOneAndUpdate({email: email, role:"participant"}, {emailVerification: true}, {new: true});
  console.log("new",newP);
    // const participant = new Participant.findOne({email: email});
    // if(!participant){
    //   return res.status(404).json({message: "User not found"})
    // }
    // if(!isMatch){
    //  return res.status(400).json({message:"INVALID INPUTS/INPUT"})
    // }
  
    // const token = jwt.sign({email: participant.email, role:"participant"}, process.env.JWT_SECRET, {expiresIn: "1h"});
    res.status(200).json({message:"Email verified! Now You Can Login", success: true})
} catch(err) {
  res.status(500).json({message:"Internal Server Error"})
}
 
});



module.exports = router;

//** legacy auth logic **//
// router.get('/login', (req, res) => {
//   console.log("Login route accessed");
//   if (req.oidc.isAuthenticated()) {
//       console.log("User is already authenticated");
//       return res.redirect('/participant');
//   }

//   console.log("User not authenticated, initiating login");
//   res.oidc.login({ 
//     authorizationParams: { 
//       prompt: 'login', 
//       connection: 'participants', 
//       state: '/participant' 
//     } 
//   });
// });

// // Handle callback logic from Auth0
// router.get('/callback', (req, res) => {
//   if (req.oidc.isAuthenticated()) {
//     // If user is authenticated, redirect to the desired page
//     return res.redirect(req.query.state || '/participant');
//   } else {
//     // Log errors for better debugging
//     console.error('Authentication failed:', req.oidc);
//     res.status(401).json({ message: 'User not authenticated' });
//   }
// });


// router.get('/logout', (req, res) => {
//   res.oidc.logout({
//       returnTo: 'http://localhost:3000/', // Redirect after logout
//       logoutParams: {
//           federated: true, // This logs the user out of Auth0 and any other identity providers
//       },
//   });
// });