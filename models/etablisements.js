'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class etablisements extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

         //association etablisement compteutilisateur
      this.hasOne(models.CompteUtilisateur,{
        foreignKey:{
          name:'etablisementID',
          allowNull:true
        }
      })
      models.CompteUtilisateur.belongsTo(models.etablisements,{
        foreignKey:{
          name:'etablisementID',
          allowNull:true
        }
      })

       //association etablisement personel
       models.etablisements.hasMany(models.personeladmin,{
        foreignKey :{
          name:'etablisementID',
          allowNull:false
        }
      })
      models.personeladmin.belongsTo(models.etablisements,{
        foreignKey :{
          name:'etablisementID',
          allowNull:false
        }
      })

      //association etablisement classes 
      models.etablisements.hasMany(models.classes,{
        foreignKey :{
          name:'etablisementID',
          allowNull:false
        }
      })
      models.classes.belongsTo(models.etablisements,{
        foreignKey :{
          name:'etablisementID',
          allowNull:false
        }
      })
    }
  };
  etablisements.init({
    NomEtab: DataTypes.STRING,
    adresseEtab: DataTypes.STRING,
    teleEtab: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'etablisements',
  });
  return etablisements;
};
