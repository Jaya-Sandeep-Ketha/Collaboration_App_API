"use strict";

module.exports = (sequelize, DataTypes) => {
    const Works = sequelize.define('Works', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        }
      });
  return Works;
};