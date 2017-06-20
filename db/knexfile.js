module.exports = {
  client: 'postgresql',
  connection: {
    database: 'vinyl',
    user:     process.env.USER,
    password: 'password'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
