
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('follower_followees').del()
    .then(function () {
      // Inserts seed entries
      return knex('follower_followees').insert([
        {follower_id: 2, followee_id: 1},
        {follower_id: 3, followee_id: 1}
      ]);
    });
};
