const http = require('http')
const express = require('express')
const path = require('path')
const reload = require('reload')
const bodyParser = require('body-parser')
const md5 = require('md5')
const fs = require('fs')
const morgan = require('morgan')
const app = express()

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

app.locals.folders = [{id: '1', name: 'test'}]


app.locals.urls = [{ id: '1', longURL: 'http://www.google.com', shortenedURL: 'Animals', folderID: 'test'},
{ id: '2', shortenedURL: 'Food', folderID: 'test'}
]

app.post('/api/folders', (req, res)=> {
  const { name } = req.body
  const id = md5(name)
  app.locals.folders.push({ id, name })
  res.json({ id, name })
})

app.post('/api/folders/:folderName/urls', (req, res)=> {
  const { longURL, counter, date } = req.body
  const { folderName } = req.params
  app.locals.urls.push({ id: md5(longURL) + 13, longURL: longURL, shortenedURL: md5(longURL), folderID: folderName, counter: counter, date: date })
  const url = app.locals.urls.filter((url)=> {
    return url.folderID == folderName
  })
    if(!url) {
      return res.sendStatus(404)
    }
  res.send(url)
  console.log(app.locals.urls);
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

app.get('/api/folders/urls/:folderName', (req, res)=> {
  const { folderName } = req.params
  const url = app.locals.urls.filter((url)=> {
    return url.folderID == folderName
  })
    if(!url) {
      return res.sendStatus(404)
    }
  res.send(url)
})

app.get('/api/folders', (req, res)=> {
  const folders = app.locals.folders
   res.json(folders)
})

app.listen(app.get('port'), ()=> {
  console.log('Magic is running on 3000')
})
