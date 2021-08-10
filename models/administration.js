'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class administration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     models.administration.hasMany(models.personeladmin,{
        foreignKey :{
          name:'adminsID',
          allowNull:false
        }
      })
      models.personeladmin.belongsTo(models.administration,{
        foreignKey :{
          name:'adminsID',
          allowNull:false
        }
      })
    }
  };
  administration.init({
    cool: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'administration',
  });
  return administration;
};