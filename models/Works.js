module.exports = (sequelize, DataTypes) => {
  const Work = sequelize.define("Work", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    employee_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Work.associate = (models) => {
    Work.belongsTo(models.User, { foreignKey: "employee_id" });
    Work.belongsTo(models.Project, { foreignKey: "project_id" });
  };

  return Work;
};
