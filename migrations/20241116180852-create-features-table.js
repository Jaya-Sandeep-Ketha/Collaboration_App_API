'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Features', {
      feature_id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      feature_name: Sequelize.DataTypes.STRING
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Features');
  },
};