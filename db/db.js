const Knex = require('knex')
const knex = Knex(require('./knexfile.js'))


const getAllAlbums = () => {
  return knex
  .table('albums')
  .returning('*')
}

const signup = ( name, email, password ) => {
  return knex('users')
  .insert({
    name: name,
    email: email,
    password: password
  }, '*')
  .then( res => {
    return { success: true, user: res[0] }
  })
  .catch( () => {
    return { success: false, message: "duplicate username or password"}
  })
}

const getUsername = ( id ) => {
  return knex
  .select('name')
  .from('users')
  .where('id', id)
  .then( res => {
    return { success: true, username: res[0].name }
  })
  .catch( error => {
    return { success: false, message: "incorrect user data, please relogin" }
  })
}

const login = ( email, password ) => {
  return knex
  .select('*')
  .from('users')
  .where('email', email)
  .then( res => {
    if( res[0].password === password ){
      return { id: res[0].id, login: true }
    } else {
      return { login: false, message:'Incorrect email or password'}
    }
  })
  .catch( () => {
    return { login: false, message:'Incorrect email or password'}
  })
}


module.exports = {
  getAllAlbums,
  signup,
  getUsername,
  login
}
