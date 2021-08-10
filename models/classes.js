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
        models.classes.hasMany(models.cours,{
        foreignKey :{
          name:'classID',
          allowNull:false
        }
      })
      models.cours.belongsTo(models.classes,{
        foreignKey :{
          name:'classID',
          allowNull:false
        }
      })
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