const controller = {};
const models = require('../models');
const User = models.User;
const bcrypt = require('bcryptjs');

controller.getUserByEmail = (email) => {
    return User.findOne({
        where: {
            username:email
        }
    })
}

controller.getUserByFBID = (FBID) => {
    return User.findOne({
        where: {
            fbID:FBID
        }
    })
}

controller.createUser = (user) => {
    let salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password,salt);
    return User.create(user);
}

controller.comparePassword = (password,hash) => {
    return bcrypt.compareSync(password,hash)
}


module.exports = controller;