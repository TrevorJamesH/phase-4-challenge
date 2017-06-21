const Knex = require('knex')
const knex = Knex(require('./knexfile.js'))


const getAllAlbums = () => {
  return knex
  .table('albums')
  .returning('*')
}

const getAlbumById = ( id ) => {
  return knex
  .table('albums')
  .returning('*')
  .where('id', id)
  .then( album => album[0] )
}

const getReviewsByAlbumId = ( id ) => {
  return knex
  .table('reviews')
  .select(
    'reviews.id',
    'reviews.text',
    'reviews.user_id',
    'users.name')
  .where('album_id', id)
  .leftJoin('users', 'reviews.user_id', 'users.id')
  .orderBy('reviews.timeCreated', 'desc')
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
    return { success: false, message: "duplicate username or email"}
  })
}

const getUser = ( id ) => {
  return knex
  .select('*')
  .from('users')
  .where('id', id)
  .then( res => {
    return { success: true, user: res[0] }
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

const addReview = ( userId, albumId, review ) => {
  return knex('reviews')
  .insert({
    user_id: userId,
    album_id: albumId,
    text: review
  },'*')
}

const deleteReviewById = ( reviewId ) => {
  console.log('delete querey', reviewId)
  return knex('reviews')
  .where( 'id', reviewId )
  .del()
}

const getReviewsByUser = ( userId ) => {
  return knex
  .select(
    'reviews.id',
    'reviews.text',
    'reviews.timeCreated',
    'reviews.user_id',
    'albums.title',
    'albums.artist')
  .from('reviews')
  .where('user_id', userId)
  .join('albums','reviews.album_id','albums.id')
  .orderBy('timeCreated', 'desc')
}

const getRecentReviews = () => {
  return knex
  .table('reviews')
  .select(
    'reviews.id',
    'reviews.text',
    'reviews.user_id',
    'users.name',
    'albums.title',
    'albums.artist')
  .join('users', 'reviews.user_id', 'users.id')
  .join('albums','reviews.album_id','albums.id')
  .orderBy('reviews.timeCreated', 'desc')
  .limit( 3 )
}

module.exports = {
  getAllAlbums,
  signup,
  getUser,
  login,
  getReviewsByAlbumId,
  getAlbumById,
  addReview,
  deleteReviewById,
  getReviewsByUser,
  getRecentReviews
}
