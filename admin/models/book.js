'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      book.belongsTo(models.category)
    }
  };
  book.init({
    name: DataTypes.STRING,
    categoryid: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    cover_image: DataTypes.STRING,
    author: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    status: DataTypes.ENUM('1', '0')
  }, {
    sequelize,
    modelName: 'book',
  });
  return book;
};