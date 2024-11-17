module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      employee_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      project_id: {
        type: DataTypes.STRING, // User-defined project ID
        allowNull: false,
      },
      employee_fname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      employee_lname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      chat_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reports_to: {
        type: DataTypes.STRING, // Keep it as a simple field
        allowNull: true, // Can be null if the user does not report to anyone
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true, // Adds createdAt and updatedAt fields automatically
    }
  );

  return User;
};
