'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('personeladmins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      NomPersonel: {
        type: Sequelize.STRING
      },
      prenomPersonel: {
        type: Sequelize.STRING
      },
      emailPersonel: {
        type: Sequelize.STRING
      },
      datenaissPersonel: {
        type: Sequelize.STRING
      },
      sexPersonel: {
        type: Sequelize.STRING
      },
      lieunaissPersonel: {
        type: Sequelize.STRING
      },
      telPersonel: {
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
    await queryInterface.dropTable('personeladmins');
  }
};