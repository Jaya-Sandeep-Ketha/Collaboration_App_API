module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    "Project",
    {
      project_id: {
        type: DataTypes.STRING, // User-defined project ID
        allowNull: false,
      },
      project_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      github_repo_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      project_api_key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Companies",
          key: "company_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["project_id", "company_id"], // Composite unique constraint
          name: "unique_project_per_company",
        },
      ],
    }
  );

  Project.associate = (models) => {
    Project.belongsTo(models.Company, { foreignKey: "company_id" });
    Project.hasMany(models.Feature, {
      foreignKey: "project_id",
      onDelete: "CASCADE",
    });
    Project.hasMany(models.Work, {
      foreignKey: "project_id",
      onDelete: "CASCADE",
    });
  };

  return Project;
};
