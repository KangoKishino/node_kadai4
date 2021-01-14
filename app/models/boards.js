'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Boards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Boards.init({
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    userName: DataTypes.STRING,
    like: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Boards',
  });
  return Boards;
};