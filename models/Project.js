const { Model } = require('objection');
const database = require('../database');
Model.knex(database);

class Project extends Model {
  static tableName = 'projects';
}

module.exports = Project;
