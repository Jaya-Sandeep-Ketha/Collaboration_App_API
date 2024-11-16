"use strict";

module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define(
    "Company",
    {
        company_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        company_name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        location: DataTypes.STRING,
        api_key: DataTypes.STRING
    });
  return Company;
};