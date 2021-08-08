'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Eleves extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Eleves.init({
    NomEleve: DataTypes.STRING,
    prenomEleve: DataTypes.STRING,
    emailEleve: DataTypes.STRING,
    datenaissEleve: DataTypes.STRING,
    sexEleve: DataTypes.STRING,
    lieunaissEleve: DataTypes.STRING,
    telEleve: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Eleves',
  });
  return Eleves;
};