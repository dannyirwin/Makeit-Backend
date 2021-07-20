
exports.up = function (knex) {
    return knex.schema.createTable('follower_followees', t => {
        t.increments();
        t.integer('follower_id').references('id').inTable('users');
        t.integer('followee_id').references('id').inTable('users');
    })
  
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('follower_followees')
  
};
