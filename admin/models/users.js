'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  users.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    mobile: DataTypes.STRING,
    gender: DataTypes.ENUM("male", "female", "other"),
    adress: DataTypes.TEXT,
    status: DataTypes.ENUM('1', "0")
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};