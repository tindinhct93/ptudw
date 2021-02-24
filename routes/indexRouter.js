const express = require('express');
const router = express.Router();



router.get('/',async (req,res,next)=> {
    let categoryController = require("../controllers/categoryController");
    let productController = require("../controllers/productController");
    try {
        let [categories, trendingProducts] = await Promise.all([categoryController.getAll(),productController.getTredingProducts()]);
        res.locals.categories = categories;
        res.locals.trendingProducts = trendingProducts;
        //res.send(data);
        res.render('index');
    } catch (e) {
        next(e);
    }

})


module.exports = router;