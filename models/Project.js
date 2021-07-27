const { Model } = require('objection');
const database = require('../database');
Model.knex(database);

const Comment = require('./Comment');
const Image = require('./Image');

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
      },
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: 'projects.id',
          to: 'comments.project_id'
        }
      },
      images: {
        relation: Model.HasManyRelation,
        modelClass: Image,
        join: {
          from: 'projects.id',
          to: 'images.project_id'
        }
      }
    };
  }
}

module.exports = Project;
