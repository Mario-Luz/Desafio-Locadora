import Sequelize from "sequelize";
import path from "path";
import fs from "fs";

let database = null;

const loadModels = (sequelize) => {
  const dir = path.join(__dirname, "../models");
  let models = [];
  fs.readdirSync(dir).forEach((file) => {
    const model = sequelize.import(path.join(dir, file));
    models[model.name] = model;
  });
  return models;
};

const setForeignKeys = (models) => {
  models.movie.belongsToMany(models.user, {
    through: {
      model: models.rent,
      unique: false,
    },
    foreignKey: "movieId",
    constraints: false,
  });

  models.user.belongsToMany(models.movie, {
    through: {
      model: models.rent,
      unique: false,
    },
    foreignKey: "userId",
    constraints: false,
  });

  return models;
};

export default (app) => {
  if (!database) {
    const config = app.config;
    const sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config.params
    );
    database = {
      sequelize,
      Sequelize,
      models: [],
    };

    database.models = setForeignKeys(loadModels(sequelize));

    sequelize.sync().done(() => database);
  }
  return database;
};
