'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Companies', {
      company_id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
      },
      company_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      location: Sequelize.DataTypes.STRING,
      api_key: Sequelize.DataTypes.STRING 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Companies');
  },
};