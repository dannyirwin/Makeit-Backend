const { Model } = require('objection');
const database = require('../database');
Model.knex(database);

class Project extends Model {
  static tableName = 'projects';

  static get relationMappings() {
    const User = require('../models/User');
    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'projects.author_id',
          to: 'users.id'
        }
      }
    };
  }
}

module.exports = Project;
