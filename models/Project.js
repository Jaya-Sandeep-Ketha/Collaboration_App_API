module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    "Project",
    {
      project_id: {
        type: DataTypes.STRING, // User-defined project ID
        allowNull: false,
        primaryKey: true,
      },
      project_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      github_repo_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      company_code: {
        type: DataTypes.STRING, // Reference to Companies table company_code
        allowNull: false,
      },
    },
    {
      tableName: "Projects", // Correct table name
    }
  );

  return Project;
};
