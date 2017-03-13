const http = require('http')
const express = require('express')
const path = require('path')

const app = express()

app.set('localhost', 3000)

app.use(express.static(path.join(__dirname, 'public')))

const server = app.listen(app.get('localhost'), () => {
  const port = server.address().port
  console.log('Magic happens on port ' + port);
})
// server.on('request', (req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/javascript' })
//   res.sendFile('/public/index.html')
//   res.end()
// })
