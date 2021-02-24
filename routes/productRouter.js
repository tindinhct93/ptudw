const express = require('express');
const router = express.Router();



router.get('/',(req,res)=> {
    let categoryController = require("../controllers/categoryController");

    res.locals.categories = categories;
    res.render('category');
})

router.get('/:id',(req,res)=> {
    res.render('single-product');
})


module.exports = router;