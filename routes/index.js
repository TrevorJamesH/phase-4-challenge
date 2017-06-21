const express = require('express')
const router = express.Router()
const {
  signup,
  getAllAlbums,
  getUser,
  login,
  getAlbumById,
  getReviewsByAlbumId,
  addReview,
  deleteReviewById,
  getReviewsByUser,
  getRecentReviews
} = require('../db/db')

module.exports = function(app) {

  router.get('/', (req, res) => {
    getRecentReviews()
    .then( reviews => {
      getAllAlbums()
      .then( albums => {
        if( req.cookies.user_id ){
          getUser( req.cookies.user_id )
          .then( response => {
            if( response.success ){
              res.render('index',{
                login: true,
                user: response.user,
                albums: albums,
                reviews: reviews
              })
            }
          })
        } else {
          res.render('index',{
            login: false,
            albums: albums,
            reviews: reviews
          })
        }
      })
    })
  })

  router.get('/login', (req, res) => {
    res.render('login',{
      message: 'Login with your email and password'
    })
  })

  router.post('/login', (req, res) => {
    login( req.body.email, req.body.password )
    .then( response => {
      if( response.login ){
        res.cookie('user_id', response.id )
        res.redirect('/')
      } else {
        res.render('login',{
          message: response.message
        })
      }
    })
  })

  router.get('/logout', (req, res) => {
    res.clearCookie('user_id')
    res.redirect('/')
  })

  router.get('/signup', (req, res) => {
    res.render('signup',{
      message: 'Create an account'
    })
  })

  router.post('/signup', (req, res) => {
    signup(req.body.name, req.body.email, req.body.password)
    .then( response => {
      if( response.success ){
        res.cookie('user_id', response.user.id)
        res.redirect('/')
      } else {
        res.render('signup',{
          message: response.message
        })
      }
    })
  })

  router.get('/albums/:albumId', (req, res) => {
    const albumId = req.params.albumId
    getAlbumById( albumId )
    .then( album => {
      getReviewsByAlbumId( albumId )
      .then( reviews => {
        getUser( req.cookies.user_id )
        .then( response => {
          if(response.success){
            res.render('album',{
              login: true,
              user: response.user,
              album: album,
              reviews: reviews
            })
          } else {
            res.render('album',{
              login: false,
              album: album,
              reviews: reviews
            })
          }
        })
      })
    })
  })

  router.get('/review/:albumId', (req, res) => {
    getAlbumById( req.params.albumId )
    .then( album => {
      getUser( req.cookies.user_id )
      .then( response => {
        res.render('review',{
          login: true,
          user: response.user,
          album: album,
          message: 'Tell us about the album'
        })
      })
    })
  })

  router.post('/review/:albumId', (req, res) => {
    if( req.body.review.replace(/\s/g, '').length > 0 ){
      addReview( req.cookies.user_id, req.params.albumId, req.body.review )
      .then( review => {
        res.redirect('/albums/'+req.params.albumId)
      })
    } else {
      getAlbumById( req.params.albumId )
      .then( album => {
        getUser( req.cookies.user_id )
        .then( response => {
          res.render('review',{
            login: true,
            user: response.user,
            album: album,
            message: 'Write something first'
          })
        })
      })
    }
  })

  router.get('/review/delete/:reviewId', (req, res) => {
    console.log('delete route')
    deleteReviewById( req.params.reviewId )
    .then( () => res.redirect('back'))
  })

  router.get('/profile/:userId', (req, res) => {
    getReviewsByUser( req.params.userId )
    .then( reviews => {
      getUser( req.cookies.user_id )
      .then( response => {
        getUser( req.params.userId )
        .then( viewingUser => {
          res.render('profile',{
            login: true,
            user: response.user,
            reviews: reviews,
            viewingUser: viewingUser.user
          })
        })
      })
    })
  })

  return router
}
