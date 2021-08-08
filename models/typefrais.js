'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class typefrais extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  typefrais.init({
    descfrais: DataTypes.STRING,
    montantFrais: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'typefrais',
  });
  return typefrais;
};