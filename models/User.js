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
    },
    followed_projects: {
      relation: Model.ManyToManyRelation,
      modelClass: Project,
      join: {
        from: 'users.id',
        through: {
          from: 'user_projects.user_id',
          to: 'user_projects.project_id'
        },
        to: 'projects.id'
      }
    }
  };
}

module.exports = User;
