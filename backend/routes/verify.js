const express = require('express');
const router = express.Router();
const DiamSdk = require("diamnet-sdk");
const server = new DiamSdk.Aurora.Server("https://diamtestnet.diamcircle.io/");
const dotenv = require('dotenv');



dotenv.config();

router.get("/:verificationId", async (req, res)=> {

    const verificationId = req.params.verificationId;
    
    try {
    const transactionDetails = await server
    .transactions()
    .transaction(verificationId)
    .call();
  
  
    console.log("Asset details retrieved:", transactionDetails);
    res.status(200).json({success:true, cert:transactionDetails.memo});
  } catch (e) {
    console.log(e)
    res.status(500).json({error:true, msg:e.message})
  }
  
  })
  
  module.exports = router;