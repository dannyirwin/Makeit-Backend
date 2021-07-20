const { Model } = require('objection');
const database = require('../database');

Model.knex(database);

class FollowerFollowee extends Model {
    static tableName = 'follower_followees'
}

module.exports = {FollowerFollowee}