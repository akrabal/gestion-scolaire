'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class personeladmin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      // define association here
      this.hasOne(models.CompteUtilisateur,{
        foreignKey:{
          name:'personelID',
          allowNull:true
        }
      })
      models.CompteUtilisateur.belongsTo(models.personeladmin,{
        foreignKey:{
          name:'personelID',
          allowNull:true
        }
      })
    }
  };
  personeladmin.init({
    NomPersonel: DataTypes.STRING,
    prenomPersonel: DataTypes.STRING,
    emailPersonel: DataTypes.STRING,
    datenaissPersonel: DataTypes.STRING,
    sexPersonel: DataTypes.STRING,
    lieunaissPersonel: DataTypes.STRING,
    telPersonel: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'personeladmin',
  });
  return personeladmin;
};