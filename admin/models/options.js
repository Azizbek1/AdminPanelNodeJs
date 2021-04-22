'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class options extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  options.init({
    option_name: DataTypes.STRING,
    option_value: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'options',
    timestamps: false
  });
  return options;
};