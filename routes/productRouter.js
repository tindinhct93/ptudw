const express = require('express');
const router = express.Router();



router.get('/',async (req,res,next)=> {

    let categoryController = require("../controllers/categoryController");
    let brandController = require("../controllers/brandController");
    let colorController = require("../controllers/colorController");
    let productController = require("../controllers/productController");
    try {
        let [categories,brands,colors,products] = await Promise.all([
            categoryController.getAll(),
            brandController.getAll(req.query),
            colorController.getAll(req.query),
            productController.getAll(req.query)
        ]);
        res.locals.categories = categories;
        res.locals.brands = brands;
        res.locals.colors = colors;
        res.locals.products = products;

        //res.locals.trendingProducts = trendingProducts;
        //res.send(data);
        res.render('category');
    } catch (e) {
        next(e);
    }
})

router.get('/:id',async (req,res,next)=> {
    let productController = require("../controllers/productController");
    try {
        let [product] = await Promise.all([
            productController.getById(req.params.id)
        ]);

        res.locals.product = product;

        //res.locals.trendingProducts = trendingProducts;
        //res.send(data);
        res.render('single-product');
    } catch (e) {
        next(e);
    }

})


module.exports = router;