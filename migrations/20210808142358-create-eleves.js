'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Eleves', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      NomEleve: {
        type: Sequelize.STRING
      },
      prenomEleve: {
        type: Sequelize.STRING
      },
      emailEleve: {
        type: Sequelize.STRING
      },
      datenaissEleve: {
        type: Sequelize.STRING
      },
      sexEleve: {
        type: Sequelize.STRING
      },
      lieunaissEleve: {
        type: Sequelize.STRING
      },
      telEleve: {
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
    await queryInterface.dropTable('Eleves');
  }
};