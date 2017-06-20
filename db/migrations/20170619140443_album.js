
exports.up = function(knex, Promise) {
  return knex.schema.createTable('albums', function(table){
    table.increments('id').primary
    table.string('title')
    table.string('artist')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('albums')
};
