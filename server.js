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

app.post('/api/folders/:id/urls', (req, res)=> {
  const { longURL } = req.body
  const { id } = req.params
  const url = { longURL, shortenedURL: md5(longURL), folderID: id, clicks: 0 }
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

app.get('/:shortURL', (req, res) => {
  const { shortURL } = req.params
  let longURL
  let updatedClicks
  database('urls').where('shortenedURL', shortURL).select()
  .then((urls)=> {
    longURL = (urls[0].url)
    updatedClicks = (urls[0].clicks) + 1
  })
  .then(()=> {
    database('urls').where('shortenedURL', shortURL).update({ clicks: updatedClicks })
      .then(()=> {
        response.status(302).redirect(`${longURL}`)
      })
  })
  .catch(function(error) {
    console.error('somethings wrong with the db')
  })
})


//WIP Couter patch request
// app.patch('/api/urls/:id', (request, response)=> {
//   const { id } = request.params
//   let clicks
//   database('urls').where('id', id).select()
//     .then((url) => {
//       clicks = url.clicks + 1
//       database('urls').where('id', id).select().update({ click })
//     })
//     .then(response.increment('clicks', 1).where('id', id))
// })

if(!module.parent){
  app.listen(app.get('port'), ()=> {
    console.log('Magic is running on 3000')
  })
}

module.exports = app
