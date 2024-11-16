'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Projects', {
      project_id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      project_name: Sequelize.DataTypes.STRING,
      github_repo_name: Sequelize.DataTypes.STRING,
      project_api_key: Sequelize.DataTypes.STRING
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Projects');
  },
};