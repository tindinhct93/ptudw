let controller = {};
let models = require('../models');
let Brand = models.Brand;
let Sequelize = require('sequelize');
let op = Sequelize.Op;

controller.getAll = async (query)=> {
    try {
        let options = {
            attributes: ['id','name','imagepath'],
            include: [{
                model:models.Product,
                attributes: ['id'],
                where: {
                    price : {
                        [op.gte]: query.min,
                        [op.lte]: query.max
                    }
                }
            }]
        };
        if (query.category>0) {
            options.include[0].where.categoryId = query.category;
        }
        if (query.color>0) {
            options.include[0].include = [{
                model: models.ProductColor,
                attributes: [],
                where: {colorId: query.color}
            }]
        }
        let data = await Brand.findAll(options);
        //return data.toJSON;
        //let new_data = data.map(item=>{return {...item.dataValues}})
        return data;
    } catch (e) {
        throw new Error(e);
    }
}

module.exports = controller;