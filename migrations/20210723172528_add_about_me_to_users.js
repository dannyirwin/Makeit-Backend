exports.up = function (knex) {
  return knex.schema.table('users', t => {
    t.text('about_me');
  });
};

exports.down = function (knex) {
  return knex.schema.table('users', t => {
    t.dropColumn('about_me');
  });
};
