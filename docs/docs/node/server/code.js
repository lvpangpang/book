const http = require('http')

const server = http.createServer((req, res) => {
  res.setHeader(
    'Content-Type', 'text/plain'
  )
  res.end('hello 吕肥肥')
})

server.listen(8888,() => {
  console.log('服务开启成功')
})
