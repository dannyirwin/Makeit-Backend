exports.up = function (knex) {
  return knex.schema.createTable('follower_followees', t => {
    t.increments();
    t.integer('follower_id')
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    t.integer('followee_id')
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('follower_followees');
};
