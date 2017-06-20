const Knex = require('knex')
const knex = Knex(require('./knexfile.js')


const getAllAlbums = () => {
  return knex
  .table('albums')
  .returning('*')
}

module.exports = {
  getAllAlbums
}
