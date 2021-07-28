exports.up = function (knex) {
  return knex.schema.table('users', t => {
    t.text('image_url');
  });
};

exports.down = function (knex) {
  return knex.schema.table('users', t => {
    t.dropColumn('image_url');
  });
};
