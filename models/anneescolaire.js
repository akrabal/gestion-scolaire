'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class anneeScolaire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //relation annee_scolaires classes
    models.anneeScolaire.hasMany(models.classes,{
      foreignKey :{
        name:'annescolaireID',
        allowNull:false
      }
    })
    models.classes.belongsTo(models.anneeScolaire,{
      foreignKey :{
        name:'annescolaireID',
        allowNull:false
      }
    })
    }
  };
  anneeScolaire.init({
    anninf: DataTypes.STRING,
    annsup: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'anneeScolaire',
  });
  return anneeScolaire;
};