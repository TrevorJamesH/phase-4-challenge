const express = require('express')
const router = express.Router()
const {signup, getAllAlbums, getUsername, login} = require('../db/db')

module.exports = function(app) {

  router.get('/', (req, res) => {
    if( req.cookies.user_id ){
      getUsername( req.cookies.user_id )
      .then( response => {
        if( response.success ){
          console.log('getUsername user', response.username)
          res.render('index',{
            login: true,
            user: response.username
          })
        } else {
          res.render('index',{
            login: false,
          })
        }
      })
    } else {
      res.render('index',{
        login: false,
      })
    }
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
    console.log('logout')
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
        console.log('signup res', response.user)
        res.cookie('user_id', response.user.id)
        res.redirect('/')
      } else {
        res.render('signup',{
          message: response.message
        })
      }
    })
  })

  router.get('/albums', (req, res) => {
    res.render('albums')
  })

  return router
}
