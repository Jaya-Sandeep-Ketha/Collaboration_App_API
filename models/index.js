"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    try {
      console.log(`Model loaded: `, {
        fileName: file,
        modelType: typeof model,
        modelName: model.name || "unnamed",
      });

      if (typeof model === "function") {
        const initializedModel = model(sequelize, Sequelize.DataTypes);
        console.log(`Initialized model name: ${initializedModel.name}`);
        db[initializedModel.name] = initializedModel;
      } else {
        console.log(`Skipping non-function model in file: ${file}`);
      }
    } catch (error) {
      console.error(`Error loading model ${file}:`, error);
    }
  });

// Add this block to initialize associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
