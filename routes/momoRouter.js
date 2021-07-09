const express = require('express');
const router = express.Router();
const momoController = require("../controllers/momoController");

//1 router for get the Momo page


router.get('/',async (req,res,next)=> {
    let data = await momoController.captureWallet("");
    let returLink = data.payUrl;
    res.redirect(returLink)
})

   

//1 router for receive the Pust Notification






module.exports = router;