exports.up = function (knex) {
  return knex.schema.createTable('comments', t => {
    t.increments();
    t.timestamps(false, true);
    t.integer('project_id').references('id').inTable('projects');
    t.integer('user_id').references('id').inTable('users');
    t.text('content');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('comments');
};
