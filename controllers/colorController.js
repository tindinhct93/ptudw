let controller = {};
let models = require('../models');
let Color = models.Color;
let Sequelize = require('sequelize');
let op = Sequelize.Op;

controller.getAll = async (query)=> {
    try {
        let options =
        {
            attributes: ['id','name','imagepath','code'],
            include: [{
                model:models.ProductColor,
                include: [{
                    model: models.Product,
                    attributes: [],
                    where: {
                        price : {
                            [op.gte]: query.min,
                            [op.lte]: query.max
                        }
                    }
                }]

            }]
        }
        if (query.category>0) {
            options.include[0].include[0].where.categoryId = query.category
        }
        if (query.search != "") {
            options.include[0].include[0].where.name = {
                [op.iLike]: `%${query.search}%`
            }
        }
        if (query.brand>0) {
            options.include[0].include[0].where.brandId = query.brand
        }
        let data = await Color.findAll(options);
        //return data.toJSON;
        //let new_data = data.map(item=>{return {...item.dataValues}})
        return data;
    } catch (e) {
        throw new Error(e);
    }
}

module.exports = controller;