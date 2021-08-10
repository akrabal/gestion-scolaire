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
      models.etablisements.hasOne(models.administration,{
        foreignKey:{
          name:'etablisementID',
          allowNull:false
        }
      })

      models.administration.belongsTo(models.etablisements,{
        foreignKey:{
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