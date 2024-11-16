module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    "Admin",
    {
      admin_fname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      admin_lname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emailId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true, // Ensure valid email format
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      company_code: {
        type: DataTypes.STRING, // No foreign key constraint here
        allowNull: false,
      },
      company_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "Admins", // Explicit table name
    }
  );

  return Admin;
};
