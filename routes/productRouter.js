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
            brandController.getAll(),
            colorController.getAll(),
            productController.getAll()
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

router.get('/:id',(req,res)=> {
    res.render('single-product');
})


module.exports = router;