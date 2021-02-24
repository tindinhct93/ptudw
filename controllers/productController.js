let controller = {};
let models = require('../models');
let Product = models.Product;

controller.getTredingProducts = async ()=> {
    try {
        let data = await Product.findAll({
            order: [
                ['overallReview','DESC']
            ],
            limit:8,
            include: [{model: models.Category}],
            attributes: ['id','name','imagepath','summary']
            //include: []
        });
        //return data.toJSON;
        //let new_data = data.map(item=>{return {...item.dataValues}})
        return data;
    } catch (e) {
        throw new Error(e);
    }
}

controller.getAll = async ()=> {
    try {
        let data = await Product.findAll({
            include: [{model: models.Category}],
            attributes: ['id','name','imagepath','price']
            //include: []
        });
        //return data.toJSON;
        //let new_data = data.map(item=>{return {...item.dataValues}})
        return data;
    } catch (e) {
        throw new Error(e);
    }
}

module.exports = controller;