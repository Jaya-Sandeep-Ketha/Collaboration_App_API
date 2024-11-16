'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addConstraint('Admins', {
      fields: ['employee_id'],
      type: 'foreign key',
      name: 'fk_admin_employee',
      references: {
        table: 'Users',
        field: 'employee_id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    // Create junction tables
    await queryInterface.createTable('works', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      employee_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'employee_id'
        }
      },
      project_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Projects',
          key: 'project_id'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    await queryInterface.createTable('worksOn', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      employee_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'employee_id'
        }
      },
      feature_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Features',
          key: 'feature_id'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop junction tables
    await queryInterface.dropTable('works');
    await queryInterface.dropTable('worksOn');

    // Remove constraints
    await queryInterface.removeConstraint('Projects', 'fk_project_company');
    await queryInterface.removeConstraint('Features', 'fk_feature_project');
    await queryInterface.removeConstraint('Features', 'fk_feature_company');
    await queryInterface.removeConstraint('Admins', 'fk_admin_employee');

    // Remove columns
    await queryInterface.removeColumn('Features', 'project_id');
    await queryInterface.removeColumn('Features', 'company_id');
    await queryInterface.removeColumn('Admins', 'employee_id');
    await queryInterface.removeColumn('Users', 'reports_to');
  }
};