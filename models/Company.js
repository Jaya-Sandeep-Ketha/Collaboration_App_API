module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define(
    "Company",
    {
      company_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
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
      tableName: "Companies",
    }
  );

  return Company;
};
