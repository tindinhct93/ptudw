let controller = {};
let models = require('../models');
let Color = models.Color;

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
                    where: {}
                }]

            }]
        }
        if (query.category) {
            options.include[0].include[0].where.categoryId = query.category
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