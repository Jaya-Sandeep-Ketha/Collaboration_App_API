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
      references: {
        model: "Users", // Reference the Users table
        key: "employee_id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    project_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Project", // Reference the Projects table
        key: "project_id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  });

  return Work;
};
