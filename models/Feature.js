"use strict";

module.exports = (sequelize, DataTypes) => {
    const Feature = sequelize.define('Feature', {
        feature_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        feature_name: DataTypes.STRING
      });
  return Feature;
};