const { Model } = require('objection');
const database = require('../database');

Model.knex(database);

class Comment extends Model {
  static tableName = 'comments';

  static get relationMappings() {
    const User = require('../models/User');
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'comments.user_id',
          to: 'users.id'
        }
      }
    };
  }
}

module.exports = Comment;
