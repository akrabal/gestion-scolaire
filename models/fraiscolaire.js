'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fraiscolaire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  fraiscolaire.init({
    fraisolde: DataTypes.STRING,
    datesolde: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'fraiscolaire',
  });
  return fraiscolaire;
};