const http = require('http')
const url = require('url')


const server = http.createServer((req, res) => {
    res.end('test')
})

server.listen(8080, () => {
    console.log('listening on 8080')
})