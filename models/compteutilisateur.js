'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompteUtilisateur extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CompteUtilisateur.init({
    NomUtilisateur: DataTypes.STRING,
    passwordUtilisateur:{
     type:DataTypes.STRING,
     set(value){
      this.setDataValue('passwordUtilisateur',bcrypt.hashSync(value,10)); 
     }
    } ,
    email: DataTypes.STRING
    
  }, {
    sequelize,
    modelName: 'CompteUtilisateur',
  });
  return CompteUtilisateur;
};