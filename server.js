const http = require('http')
const express = require('express')
const path = require('path')
const reload = require('reload')
const bodyParser = require('body-parser')
const md5 = require('md5')
const fs = require('fs')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('port', process.env.PORT || 3000)

app.locals.folders = []

// app.locals.folder = {}

app.locals.urls = []

app.locals.url = { id: 1, longURL: 'Animals.com', shortenedURL: 'Animals', folderID: 1}


app.get('/', (req, res)=> {
  res.send('hi')
})

app.post('/api/folders', (req, res) => {
  const { name } = req.body
  const id = md5(name)
  console.log(id);

  app.locals.folders.push({ id, name })
  res.json({ id, name })
})

app.get('/api/folders/:id', (req, res) => {
  const { id } = req.params
  const folder = app.locals.folders.find((folder) => {
    return folder.id == id
    })
    if(!folder) {
      return res.sendStatus(404)
    }
  res.json(folder)
})

app.get('/api/folders', (req, res)=> {
  const folders = app.locals.folders
   res.json(folders)
})

app.listen(app.get('port'), ()=> {
  console.log('Magic is running on 3000')
})
