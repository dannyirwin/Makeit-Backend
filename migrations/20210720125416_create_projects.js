
exports.up = function (knex) {
    return knex.schema.createTable('projects', (t) => {
        t.increments();
        t.text('content');
        t.integer('author_id').references('users.id')
    })
  
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('projects')
};
