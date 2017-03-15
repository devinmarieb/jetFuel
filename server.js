const http = require('http')
const express = require('express')
const path = require('path')
const reload = require('reload')
const bodyParser = require('body-parser')
const md5 = require('md5')
const fs = require('fs')
const app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
// app.use('/api/folders/:id', express.static('public/urlIndex.html'))

app.set('port', process.env.PORT || 3000)

app.locals.folders = [{id: '1', name: 'test'}]

app.locals.urls = [{ id: '1', longURL: 'http://www.google.com', shortenedURL: 'Animals', folderID: '1'},
{ id: '2', longURL: 'Animals.com', shortenedURL: 'Food', folderID: '1'}
]

app.post('/api/folders', (req, res)=> {
  const { name } = req.body
  const id = md5(name)
  app.locals.folders.push({ id, name })
  res.json({ id, name })
})

app.post('/api/urls', (req, res)=> {
  const { longURL } = req.body
  // const id = md5(name)
  app.locals.urls.push({ longURL })
  res.json({ longURL })
})

app.get('/api/folders/:id', (req, res)=> {
  const { id } = req.params
  const url = app.locals.urls.filter((url)=> {
    return url.folderID == id
  })
    if(!url) {
      return res.sendStatus(404)
    }
  res.json(url)
})

app.get('/api/folders', (req, res)=> {
  const folders = app.locals.folders
   res.json(folders)
})

app.get('/api/urls', (req, res)=> {
  const urls = app.locals.urls
   res.json(urls)
})

app.listen(app.get('port'), ()=> {
  console.log('Magic is running on 3000')
})
