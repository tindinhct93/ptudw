const express = require('express');
const router = express.Router();

router.get('/',async (req,res)=> {
    let cart = req.session.cart;
    res.locals.cart = cart.getCart();
    res.render('cart');
})



module.exports = router;