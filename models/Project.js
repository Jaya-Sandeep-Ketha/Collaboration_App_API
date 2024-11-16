"use strict";

module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('Project', {
        project_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        company_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        project_name: DataTypes.STRING,
        github_repo_name: DataTypes.STRING,
        project_api_key: DataTypes.STRING
      });
  return Project;
};