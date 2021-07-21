const database = require('../database');
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('projects')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        { author_id: 1, content: 'Some article' },
        { author_id: 2, content: 'adsf fda' },
        { author_id: 3, content: 'rowVa adfafd lue3' },
        { author_id: 3, content: '  adffdafd ' },
        { author_id: 3, content: 'rowVffff d fd fadadfaddfalue3' }
      ]);
    });
};
