"use strict";

module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define('Admin', {
        admin_fname: DataTypes.STRING,
        admin_lname: DataTypes.STRING,
        new_attribute: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        company_name: DataTypes.STRING,
        location: DataTypes.STRING,
      });
  return Admin;
};