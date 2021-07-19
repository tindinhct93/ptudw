'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        fullname: DataTypes.STRING,
        avatarPath: DataTypes.STRING,
        isAdmin: DataTypes.BOOLEAN,
        fbID:DataTypes.STRING
    }, {});
    User.associate = function(models) {
        // associations can be defined here
        User.hasMany(models.Comment, { foreignKey: 'userId' });
        User.hasMany(models.Review, { foreignKey: 'userId' });
    };
    return User;
};