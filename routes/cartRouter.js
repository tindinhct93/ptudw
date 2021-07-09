const express = require('express');
const router = express.Router();

router.get('/',async (req,res)=> {
    let cart = req.session.cart;
    res.locals.cart = cart.getCart();
    res.render('cart');
})

router.post('/', async (req,res,next)=> {
    let productId = req.body.id;
    let quantity = isNaN(req.body.quantity) ? 1: req.body.quantity;
    let productController = require('../controllers/productController');
    try {
        let product = await productController.getById(productId);
        let cartItem = req.session.cart.add(product, productId,quantity);
        res.json(cartItem);
    } catch (e) {
        next(e);
    }
})

router.put('/', async (req,res,next)=> {
    let productId = req.body.id;
    let quantity = parseInt(req.body.quantity);
    let cartItem = req.session.cart.update(productId,quantity);
    res.json(cartItem);
})

router.delete('/', async (req,res,next)=> {
    let productId = req.body.id;
    let cartItem = req.session.cart.remove(productId);
    res.json({
        totalQuantity: req.session.cart.totalQuantity,
        totalPrice: req.session.cart.totalPrice
    });
})

router.delete("/all", async (req,res) => {
    req.session.cart.empty();
    res.sendStatus(204);
    res.end()
})


module.exports = router;