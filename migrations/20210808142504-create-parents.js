'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Parents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      NomParent: {
        type: Sequelize.STRING
      },
      prenomParent: {
        type: Sequelize.STRING
      },
      emailParent: {
        type: Sequelize.STRING
      },
      datenaissParent: {
        type: Sequelize.STRING
      },
      sexParent: {
        type: Sequelize.STRING
      },
      telParent: {
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
    await queryInterface.dropTable('Parents');
  }
};