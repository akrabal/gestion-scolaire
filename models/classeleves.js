'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClassEleves extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ClassEleves.init({
    cool: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ClassEleves',
  });
  return ClassEleves;
};