let controller = {};
let models = require('../models');
let Category = models.Category;
let Sequelize = require('sequelize');
let op = Sequelize.Op;

controller.getAll = async (query)=> {
    try {
        let options = {
            attributes: ['id','name','imagepath','summary'],
                include: [{
                    model:models.Product,
                    where: {}
            }]
        }
        if (query && query.search != "") {
            options.include[0].where.name = {
                [op.iLike]: `%${query.search}%`
            }
        }
        let data = await Category.findAll(options);
        //return data.toJSON;
        //let new_data = data.map(item=>{return {...item.dataValues}})
        return data;
    } catch (e) {
        throw new Error(e);
    }
}

module.exports = controller;