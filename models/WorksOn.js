"use strict";

module.exports = (sequelize, DataTypes) => {
    const WorksOn = sequelize.define('WorksOn', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        }
      });
  return WorksOn;
};