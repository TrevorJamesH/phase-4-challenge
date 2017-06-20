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

const getUsername = ( id ) => {
  return knex
  .select('name')
  .from('users')
  .where('id', id)
  .then( res => res[0].name )
}

const login = ( username, password ) => {
  return knex
  .select('*')
  .from('users')
  .where('name', username)
  .then( res => {
    if( res[0].password === password ){
      return { id: res[0].id, login: true }
    } else {
      return { login: false}
    }
  })
}


module.exports = {
  getAllAlbums,
  signup,
  getUsername,
  login
}
