const express = require('express')
const router = express.Router()
const {signup, getAllAlbums} = require('../db/db')

module.exports = function(app) {

  router.get('/', (req, res) => {
    res.render('landing')
  })

  router.get('/signup', (req, res) => {
    res.render('signup')
  })

  router.post('/signup', (req, res) => {
    console.log('signup req.body',req.body)
    signup(req.body.name, req.body.password)
    .then( response => {
      console.log('signup res', response)
      res.cookie('user_id', response[0].id, { maxAge: (100000), httpOnly: false })
      res.redirect('/albums')
    })
  })

  router.get('/albums', (req, res) => {
    res.render('albums')
  })

  return router
}
