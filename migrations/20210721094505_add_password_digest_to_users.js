exports.up = function (knex) {
  return knex.schema.table('users', t => {
    t.string('password_digest');
  });
};

exports.down = function (knex) {
  return knex.schema.table('users', t => {
    t.dropColumn('password_digest');
  });
};
