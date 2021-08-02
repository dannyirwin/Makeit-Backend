// Update with your config settings.
const pg = require('pg');
pg.defaults.ssl = { require: true, rejectUnauthorized: false };

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres:///makeit_development'
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
