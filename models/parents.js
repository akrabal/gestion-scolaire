'use strict';
const {
  Model
} = require('sequelize');
const eleves = require('./eleves');
module.exports = (sequelize, DataTypes) => {
  class Parents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      //association parent compte utilisateur
      models.Parents.hasOne(models.CompteUtilisateur,{
        foreignKey:{
          name:'ParentID',
          allowNull:true
        }
      })

      models.CompteUtilisateur.belongsTo(models.Parents,{
        foreignKey:{
          name:'ParentID',
          allowNull:true
        }
      })
     
       //association parents eleves 
       models.Parents.hasMany(models.Eleves,{
        foreignKey:{
          name:'ParentID',
          allowNull:false
        }
      }) 
      models.Eleves.belongsTo(models.Parents,{
        foreignKey:{
          name:'ParentID',
          allowNull:false
        }
      })       
    }
    
  };
  Parents.init({
    NomParent: DataTypes.STRING,
    prenomParent: DataTypes.STRING,
    emailParent: DataTypes.STRING,
    datenaissParent: DataTypes.STRING,
    sexParent: DataTypes.STRING,
    telParent: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Parents',
  });
  return Parents;
};