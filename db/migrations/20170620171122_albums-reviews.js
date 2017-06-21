
exports.up = function(knex, Promise) {
  return knex.schema.createTable('reviews', function(table){
    table.increments('id').primary
    table.integer('album_id')
    table.foreign('album_id').references('albums.id').onDelete('cascade')
    table.integer('user_id')
    table.foreign('user_id').references('users.id').onDelete('cascade')
    table.string('text')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reviews')
};
