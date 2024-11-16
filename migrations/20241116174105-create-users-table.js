'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      
        employee_id: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
        },
        employee_fname: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        employee_lname: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        chat_name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        location: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        title: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        reports_to: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        company_name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        email: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        timestamps: true,  
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  },
};