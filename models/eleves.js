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
      //association eleves compteutilisateur
      this.hasOne(models.CompteUtilisateur,{
        foreignKey:{
          name:'ElevesID',
          allowNull:true
        }
      },{as: 'Eleve'})
       models.CompteUtilisateur.belongsTo(models.Eleves,{as: 'Eleve'},{
        foreignKey:{
          name:'ElevesID',
          allowNull:true
        }
      })
    //relation eleves frais_scolaire
     models.Eleves.hasMany(models.fraiscolaire,{
      foreignKey:{
        name:'EleveID',
        allowNull:false
      }
    })
    models.fraiscolaire.belongsTo(models.Eleves,{
      foreignKey:{
        name:'EleveID',
        allowNull:false
      }
    })
     //relation eleves (notes)
     models.Eleves.belongsToMany(models.notes,{through: models.evaluation})
     models.notes.belongsToMany(models.Eleves,{through: models.evaluation})
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