'use strict';
const mongoose = require('mongoose');
const { databaseUrl } = require('../../env');
const log4js = require('../../logger');
const logger = log4js.getLogger('dataBase');

exports.connect = () => {
        mongoose.connect(databaseUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            logger.info("Successfully connected to database");
        })
        .catch((e) => {
            logger.error(`No fue posible conectar con la base de datos. Error ${e}`)
        })
}