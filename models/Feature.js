module.exports = (sequelize, DataTypes) => {
  const Feature = sequelize.define("Feature", {
    feature_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    feature_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Feature.associate = (models) => {
    Feature.belongsTo(models.Project, { foreignKey: "project_id" });
    Feature.belongsTo(models.Company, { foreignKey: "company_id" });
  };

  return Feature;
};
