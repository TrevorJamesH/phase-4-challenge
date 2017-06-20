const express = require('express')
const router = express.Router()
const {signup, getAllAlbums, getUsername, login} = require('../db/db')

module.exports = function(app) {

  router.get('/', (req, res) => {
    if( req.cookies.user_id ){
      getUsername( req.cookies.user_id )
      .then( user => {
        res.render('index',{
          login: true,
          user: user
        })
      })
    } else {
      res.render('index',{
        login: false,
      })
    }
  })

  router.get('/login', (req, res) => {
    res.render('login')
  })

  router.post('/login', (req, res) => {
    login( req.body.name, req.body.password )
    .then( response => {
      if( response.login ){
        res.cookie('user_id', response.id )
        res.redirect('/')
      }
    })
  })

  router.get('/logout', (req, res) => {
    res.clearCookie('user_id')
    console.log('logout')
    res.redirect('/')
  })

  router.post('/signup', (req, res) => {
    console.log('signup req.body',req.body)
    signup(req.body.name, req.body.password)
    .then( response => {
      console.log('signup res', response)
      res.cookie('user_id', response[0].id)
      res.redirect('/albums')
    })
  })

  router.get('/albums', (req, res) => {
    res.render('albums')
  })

  return router
}
