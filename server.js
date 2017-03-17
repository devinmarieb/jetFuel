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

app.get('/api/urls/:id', (res, req)=> {
  const { id } = req.params
  database('urls').where('id', req.params.id).select()
    .then(res.increment('clicks', 1).where('id', req.params.id))
})

if(!module.parent){
  app.listen(app.get('port'), ()=> {
    console.log('Magic is running on 3000')
  })
}

module.exports = app
