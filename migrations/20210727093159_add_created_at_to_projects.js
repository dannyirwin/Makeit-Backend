exports.up = function (knex) {};

exports.down = function (knex) {};
exports.up = function (knex) {
  return knex.schema.table('projects', t => {
    t.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.table('projects', t => {
    t.timestamps(false, true);
  });
};
