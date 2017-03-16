const http = require('http')
const express = require('express')
const path = require('path')
const reload = require('reload')
const bodyParser = require('body-parser')
const md5 = require('md5')
const fs = require('fs')
const morgan = require('morgan')
const app = express()

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
})

app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('port', process.env.PORT || 3000)


app.post('/api/folders', (req, res)=> {
  const { name } = req.body
  const folder = { name }
  database('folders').insert(folder)
  .then(function() {
    database('folders').select()
            .then(function(folders) {
              res.status(200).json(folders);
            })
            .catch(function(error) {
              console.error('somethings wrong with db')
            });
  })
})

app.get('/api/folders/:id/urls', (request, response) => {
  database('urls').where('folderID', request.params.id).select()
  .then(function(urls) {
    response.status(200).json(urls);
  })
  .catch(function(error) {
    console.error('somethings wrong with db')
  });
})

// app.get('/api/urls/:shortenedUrlId', (req, res) => {
//   // let urlObject = app.locals.urls.filter()
//   // get the URL object out of app.locals based on
//   // our req.params.shortenedUrlId
//   // update the counter
//   // res.redirect(urlObject.longUrl)
// });

app.patch('/api/folders/:folderName/urls/:id', (req, res) => {
  const { counter } = req.body
  const { id, folderName } = req.params
  const url = app.locals.urls.filter((url)=> {
    return url.id == id
  })
// find the URL that you want to update
  counter = counter ++
  // update just the counter property of that URL
  res.send(counter)
});


app.post('/api/folders/:id/urls', (req, res)=> {
  const { longURL } = req.body
  const { id } = req.params
  const url = { longURL, shortenedURL: md5(longURL), folderID: id, clicks: 0, created_at: null }
  database('urls').insert(url)
  .then(function() {
    database('urls').where('folderID', id).select()
            .then(function(urls) {
              res.status(200).json(urls);
            })
            .catch(function(error) {
              console.error('somethings wrong with db')
            });
  })
})

app.get('/api/folders', (request, response) => {
  database('folders').select()
          .then(function(folders) {
            response.status(200).json(folders);
          })
          .catch(function(error) {
            console.error('somethings wrong with db')
          });
})

if(!module.parent){
  app.listen(app.get('port'), ()=> {
    console.log('Magic is running on 3000')
  })
}

module.exports = app












// app.get('/api/urls', (request, response) => {
//   database('urls').select()
//           .then(function(urls) {
//             response.status(200).json(urls);
//           })
//           .catch(function(error) {
//             console.error('somethings wrong with db')
//           });
// })
>>>>>>> 25251a6fc0e8738e30cb7870b316529812089d61
