let controller = {};
let models = require('../models');
let Brand = models.Brand;

controller.getAll = async (query)=> {
    try {
        let options = {
            attributes: ['id','name','imagepath'],
            include: [{
                model:models.Product,
                attributes: ['id'],
                where: {}
            }]
        };
        if (query.category) {
            options.include[0].where.categoryId = query.category;
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