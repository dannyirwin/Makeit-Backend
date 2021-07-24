exports.up = function (knex) {
  return knex.schema.createTable('user_projects', t => {
    t.increments();
    t.integer('user_id').references('id').inTable('users');
    t.integer('project_id').references('id').inTable('projects');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('user_projects');
};
