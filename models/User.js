module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      employee_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
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
        type: DataTypes.STRING,
        allowNull: true, // Can be null if the user does not report to anyone
        references: {
          model: "Users", // References User model
          key: "employee_id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL", // If supervisor is deleted, set to null
      },
      company_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true, // Validate email format
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

  User.associate = (models) => {
    User.belongsTo(models.User, {
      foreignKey: "reports_to",
      targetKey: "employee_id",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
  };

  return User;
};
