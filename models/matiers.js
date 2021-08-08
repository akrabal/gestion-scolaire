'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class matiers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  matiers.init({
    DescMatiere: DataTypes.STRING,
    NomMatiere: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'matiers',
  });
  return matiers;
};