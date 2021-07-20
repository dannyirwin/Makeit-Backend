const knex = require('knex');
const databaseConfig = require('./knexfile.js').development;
const database = knex(databaseConfig)

module.exports = database;