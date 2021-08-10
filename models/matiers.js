'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class matiers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //association matiere-cours
      models.matiers.hasMany(models.cours,{
        foreignKey:{
          name:'MatiereID',
          allowNull:false
        }
      })
      models.cours.belongsTo(models.matiers,{
        foreignKey:{
          name:'MatiereID',
          allowNull:false
        }
      })
    }
  };
  matiers.init({
    DescMatiere: DataTypes.STRING,
    NomMatiere: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'matiers',
  });
  return matiers;
};