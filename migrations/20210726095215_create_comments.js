exports.up = function (knex) {
  return knex.schema.createTable('comments', t => {
    t.increments();
    t.timestamps(false, true);
    t.integer('project_id')
      .references('id')
      .inTable('projects')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    t.integer('user_id')
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    t.text('content');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('comments');
};
