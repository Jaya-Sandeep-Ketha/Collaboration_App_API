require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME, // RDS username
    password: process.env.DB_PASSWORD, // RDS password
    database: process.env.DB_NAME, // RDS database name
    host: process.env.DB_HOST, // RDS endpoint (hostname)
    dialect: "postgres",
    port: process.env.DB_PORT || 5432, // Default PostgreSQL port
    dialectOptions: {
      ssl: {
        require: true, // Enforce SSL (recommended for RDS)
        rejectUnauthorized: false, // Bypass self-signed certificate errors
      },
    },
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "test_db",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "postgres",
    port: process.env.DB_PORT || 5432,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "prod_db",
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT || 5432,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
