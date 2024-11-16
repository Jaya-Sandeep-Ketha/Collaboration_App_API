'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Admins', {
      admin_fname: Sequelize.DataTypes.STRING,
      admin_lname: Sequelize.DataTypes.STRING,
      new_attribute: Sequelize.DataTypes.STRING,
      email: Sequelize.DataTypes.STRING,
      password: Sequelize.DataTypes.STRING,
      company_name: Sequelize.DataTypes.STRING,
      location: Sequelize.DataTypes.STRING
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Admins');
  },
};