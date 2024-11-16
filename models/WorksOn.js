module.exports = (sequelize, DataTypes) => {
  const WorksOn = sequelize.define("WorksOn", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    employee_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    feature_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  WorksOn.associate = (models) => {
    WorksOn.belongsTo(models.User, { foreignKey: "employee_id" });
    WorksOn.belongsTo(models.Feature, { foreignKey: "feature_id" });
  };

  return WorksOn;
};
