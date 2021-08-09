'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class professeurs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.CompteUtilisateur,{
        foreignKey:{
          name:'ProfID',
          allowNull:true
        }
      })
      models.CompteUtilisateur.belongsTo(models.professeurs,{
        foreignKey:{
          name:'profID',
          allowNull:true
        }
      })
    
    }
  };
  professeurs.init({
    NomProf: DataTypes.STRING,
    prenomProf: DataTypes.STRING,
    emailProf: DataTypes.STRING,
    datenaissProf: DataTypes.STRING,
    sexProf: DataTypes.STRING,
    lieunaissProf: DataTypes.STRING,
    telProf: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'professeurs',
  });
  return professeurs;
};