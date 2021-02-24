let controller = {};
let models = require('../models');
let Color = models.Color;

controller.getAll = async ()=> {
    try {
        let data = await Color.findAll({
            attributes: ['id','name','imagepath','code'],
            include: [{model:models.ProductColor}]
        });
        //return data.toJSON;
        //let new_data = data.map(item=>{return {...item.dataValues}})
        return data;
    } catch (e) {
        throw new Error(e);
    }
}

module.exports = controller;