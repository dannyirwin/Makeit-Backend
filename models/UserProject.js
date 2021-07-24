const { Model } = require('objection');
const database = require('../database');

Model.knex(database);

class UserProject extends Model {
  static tableName = 'user_projects';
}

module.exports = UserProject;
