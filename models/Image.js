const { Model } = require('objection');
const database = require('../database');

Model.knex(database);

class Image extends Model {
  static tableName = 'images';
}

module.exports = Image;
