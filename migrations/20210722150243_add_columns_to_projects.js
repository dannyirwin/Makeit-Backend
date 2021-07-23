exports.up = function (knex) {
  return knex.schema.table('projects', t => {
    t.string('title');
    t.text('description');
    t.string('preview_image_url');
    t.boolean('is_published');
  });
};

exports.down = function (knex) {
  return knex.schema.table('projects', t => {
    t.dropColumn('title');
    t.text('description');
    t.string('preview_image_url');
    t.boolean('is_published');
  });
};
