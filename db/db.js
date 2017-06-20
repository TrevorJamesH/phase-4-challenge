const Knex = require('knex')
const knex = Knex(require('./knexfile.js'))


const getAllAlbums = () => {
  return knex
  .table('albums')
  .returning('*')
}

const signup = (name, password) => {
  console.log('signup querey',name,password)
  return knex('users')
  .insert({
    name: name,
    password: password
  }, '*')
}


module.exports = {
  getAllAlbums,
  signup
}
