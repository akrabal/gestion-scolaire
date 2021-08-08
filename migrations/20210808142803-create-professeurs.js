'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('professeurs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      NomProf: {
        type: Sequelize.STRING
      },
      prenomProf: {
        type: Sequelize.STRING
      },
      emailProf: {
        type: Sequelize.STRING
      },
      datenaissProf: {
        type: Sequelize.STRING
      },
      sexProf: {
        type: Sequelize.STRING
      },
      lieunaissProf: {
        type: Sequelize.STRING
      },
      telProf: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('professeurs');
  }
};