var http = require('http')
var fs = require('fs')
var path = require('path')
var mime = require('mime')

const fileExists = require('file-exists')
const backendPort = 9081

function handleRequest (req, res) {
  var file = path.join('huh', req.url)
  console.log(req.url)
  fileExists(file, (err, exists) => {
    if (exists && fs.lstatSync(file).isFile()) {
      res.setHeader('Content-Type', mime.lookup(file))
      res.writeHead(200, {
        'Access-Control-Allow-Origin': '*'
      })
      fs.createReadStream(file).pipe(res)

      return
    }
    if (err) {
      res.writeHead(404)
      res.write('404 Not Found')
      res.end()
    }
  })
}

var server = http.createServer(handleRequest)

server.listen(backendPort, function () {
  console.log(`server started at http://localhost:${backendPort}`)
})
