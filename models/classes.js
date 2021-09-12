'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class classes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       //association classe cours 
       models.classes.belongsToMany(models.Eleves,{through: models.ClassEleves,as:{
        singular: "Eleve",
        plural:  'Eleves'}})
       models.Eleves.belongsToMany(models.classes,{through: models.ClassEleves,as:{
        singular: "classe",
        plural:  'classes'}})
        
      //association classe matieres

      models.classes.belongsToMany(models.matiers,{through: models.matiersclasse,as:{
        singular: "Matier",
        plural:  'Matiers'}})
       models.matiers.belongsToMany(models.classes,{through: models.matiersclasse,as:{
        singular: "classe",
        plural:  'classes'}})

    }
  };
  classes.init({
    niveauclasse: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'classes',
  });
  return classes;
};