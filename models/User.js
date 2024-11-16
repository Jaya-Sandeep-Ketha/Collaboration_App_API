"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      employee_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      employee_fname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      employee_lname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      chat_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reports_to: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      company_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true, // Adds createdAt and updatedAt
    }
  );

  return User;
};