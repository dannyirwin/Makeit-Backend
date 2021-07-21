const { Model } = require('objection');
const Project = require('./Project');
const database = require('../database');
Model.knex(database);

class User extends Model {
  static tableName = 'users';

  static relationMappings = {
    followers: {
      relation: Model.ManyToManyRelation,
      modelClass: User,
      join: {
        from: 'users.id',
        through: {
          from: 'follower_followees.followee_id',
          to: 'follower_followees.follower_id'
        },
        to: 'users.id'
      }
    },
    following: {
      relation: Model.ManyToManyRelation,
      modelClass: User,
      join: {
        from: 'users.id',
        through: {
          from: 'follower_followees.follower_id',
          to: 'follower_followees.followee_id'
        },
        to: 'users.id'
      }
    },
    myProjects: {
      relation: Model.HasManyRelation,
      modelClass: Project,
      join: {
        from: 'users.id',
        to: 'projects.author_id'
      }
    }
  };
}

module.exports = User;
