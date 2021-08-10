'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.roles.hasMany(models.CompteUtilisateur,{
        foreignKey:{
          name: "roleID",
          allowNull:false
        }
      })
      models.CompteUtilisateur.belongsTo(models.roles,{
        foreignKey:{
          name: "roleID",
          allowNull:false
        }
      })
      
      }
  };
  roles.init({
    typeRole: DataTypes.STRING,
    descRoles: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'roles',
  });
  return roles;
};