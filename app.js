const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
// const database = require('./database')
const app = express()
const path = require('path')

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))

// app.get('/', (request, response) => {
//   database.getAlbums((error, albums) => {
//     if (error) {
//       response.status(500).render('error', { error: error })
//     } else {
//       response.render('index', { albums: albums })
//     }
//   })
// })
//
// app.get('/albums/:albumID', (request, response) => {
//   const albumID = request.params.albumID
//
//   database.getAlbumsByID(albumID, (error, albums) => {
//     if (error) {
//       response.status(500).render('error', { error: error })
//     } else {
//       const album = albums[0]
//       response.render('album', { album: album })
//     }
//   })
// })

app.use('/', require('./routes/index')(app))

app.use((request, response) => {
  response.status(404).render('not_found')
})

const port = 3000
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})
