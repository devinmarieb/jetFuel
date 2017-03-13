const http = require('http')
const express = require('express')
const path = require('path')
const reload = require('reload')

const app = express()

app.set('localhost', 3000)

app.use(express.static(path.join(__dirname, 'public')))

const server = app.listen(app.get('localhost'), () => {
  const port = server.address().port
  console.log('Magic happens on port ' + port);
})

reload(server, app)
// server.on('request', (req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/javascript' })
//   res.sendFile('/public/index.html')
//   res.end()
// })
