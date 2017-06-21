
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table){
      table.timestamp('timeCreated').defaultTo(knex.fn.now())
    }),
    knex.schema.table('reviews', function(table){
      table.timestamp('timeCreated').defaultTo(knex.fn.now())
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table){
      table.dropColumn('timeCreated')
    }),
    knex.schema.table('reviews', function(table){
      table.dropColumn('timeCreated')
    })
  ])
};
