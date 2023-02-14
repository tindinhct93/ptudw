let controller = {};
let models = require('../models');
let Product = models.Product;
let Sequelize = require('sequelize');
let op = Sequelize.Op;


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

controller.getAll = async (query)=> {
    try {
        let options = {
            include: [{model: models.Category}],
            attributes: ['id','name','imagepath','price','categoryId'],
            where: {
                price : {
                    [op.gte]: query.min,
                    [op.lte]: query.max
                }
            }
        }
        if (query.category >0) {
            options.where.categoryId = query.category;
        }
        if (query.search != "") {
            options.where.name = {
                [op.iLike]: `%${query.search}%`
            }
        }

        if (query.brand>0) {
            options.where.brandId = query.brand;
        }
        if (query.color>0) {
            options.include.push({
                model: models.ProductColor,
                attributes: [],
                where:{colorId: query.color}
            })
        }
        if (query.limit>0) {
            options.limit = query.limit;
            if (!query.page) query.page =1;
            options.offset = query.limit*(query.page-1);
        }
        if (query.sort) {
            switch (query.sort) {
                case 'name':
                    options.order = [
                        ['name', 'ASC']
                    ];
                    break;
                case 'price':
                    options.order = [
                        ['price', 'ASC']
                    ];
                    break;
                case 'overallReview':
                    options.order = [
                        ['overallReview', 'DESC']
                    ];
                    break;
                default: options.order = [
                    ['name', 'ASC']
                ];
            }
        }
        let data = await Product.findAndCountAll(options); // {rows,count}
        //return data.toJSON;
        //let new_data = data.map(item=>{return {...item.dataValues}})
        return data;
    } catch (e) {
        throw new Error(e);
    }
}

controller.getById = async (id)=> {
    try {
        let product = await Product.findOne({
            where: {id:id},
            include: [{model: models.Category}],
        });
        let [Specifications,Comments,Reviews] = await Promise.all([
            // array with Productspecification have the ID = productid
            models.ProductSpecification.findAll(
                {
                    where: {productId:id},
                    include: [{model: models.Specification}]
                }),
            models.Comment.findAll(
                {
                    where: {productId:id,parentCommentId:null},
                    include: [{model: models.User},
                        {
                            model: models.Comment,
                            as:'SubComments',
                            include: [{model: models.User}]
                        }
                    ]
                }
            ),
            models.Review.findAll(
                {
                    where: {productId:id},
                    include: [{model: models.User}]
                }
            )
        ])
        product.Specifications = Specifications;
        product.Comments = Comments;
        product.Reviews = Reviews;
        let stars = [];
        for (let i =1; i<=5; i++) {
            stars.push(Reviews.filter(item => item.rating ==i).length);
        }
        product.stars = stars;
        return product;

    } catch (e) {
        throw new Error(e);
    }
}

module.exports = controller;