"use strict";
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const { databaseUrl } = require("../../env");
const log4js = require("../../logger");
const logger = log4js.getLogger("dataBase");

try {
  mongoose.connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  logger.info("Base de Datos conectada!!");
} catch (e) {
  logger.error(`Error: ${e}`);
}

module.exports = mongoose.connection;
