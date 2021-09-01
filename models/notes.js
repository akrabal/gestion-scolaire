'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        //relation notes matiere
        models.matiers.hasMany(models.notes,{
          foreignKey :{
            name:'MatierID',
            allowNull:false
          }
        })  
        models.notes.belongsTo(models.matiers,{
          foreignKey :{
            name:'MatierID',
            allowNull:false
          }
        }) 
  
    }
  };
  notes.init({
    valenote: DataTypes.STRING,
    coefnote: DataTypes.STRING,
    dateajout: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'notes',
  });
  return notes;
};