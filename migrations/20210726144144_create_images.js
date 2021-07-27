exports.up = function (knex) {
  return knex.schema.createTable('images', t => {
    t.increments();
    t.timestamps(false, true);
    t.text('image_url');
    t.string('caption');
    t.string('alt');
    t.integer('project_id')
      .references('projects.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('images');
};
