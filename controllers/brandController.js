let controller = {};
let models = require('../models');
let Brand = models.Brand;

controller.getAll = async ()=> {
    try {
        let data = await Brand.findAll({
            attributes: ['id','name','imagepath'],
            include: [{model:models.Product}]
        });
        //return data.toJSON;
        //let new_data = data.map(item=>{return {...item.dataValues}})
        return data;
    } catch (e) {
        throw new Error(e);
    }
}

module.exports = controller;