const { Model } = require('objection');
const {FollowerFollowee} = require('./FollowerFollowee')
const database = require('../database');

Model.knex(database);

class User extends Model {
    static tableName = 'users'

    static relationMappings = {
        followers: {
            relation: Model.HasOneThroughRelation,
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
            relation: Model.HasOneThroughRelation,
            modelClass: User,
            join: {
                from: 'users.id',
                through: {
                    from: 'follower_followees.follower_id',
                    to: 'follower_followees.followee_id'
                },
                to: 'users.id'
            }
        }
    }
}

module.exports = {User}