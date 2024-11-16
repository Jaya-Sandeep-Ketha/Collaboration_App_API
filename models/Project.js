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
        type: DataTypes.STRING, // Match with the Companies table's company_code
        allowNull: false,
        references: {
          model: "Companies", // Table name
          key: "company_code", // Foreign key reference
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      tableName: "Project",
      indexes: [
        {
          unique: true,
          fields: ["project_id", "company_code"], // Correct composite unique constraint
          name: "unique_project_per_company",
        },
      ],
    }
  );

  Project.associate = (models) => {
    Project.belongsTo(models.Company, { foreignKey: "company_code" }); // Correct relation
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