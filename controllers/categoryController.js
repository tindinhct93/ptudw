let controller = {};
let models = require('../models');
let Category = models.Category;

controller.getAll = async ()=> {
    try {
        let data = await Category.findAll({
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

module.exports = controller;