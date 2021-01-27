const http = require('http')
const url = require('url')


const server = http.createServer((req, res) => {
    const pathName = req.url

    if (pathName === '/overview' || pathName === '/') {
        res.end('overview')
    } else if (pathName === '/product') {
        res.end('Product')
    } else if (pathName ==='/api'){
        res.end('api')
    } else {
        res.writeHead(404, {
            'Content-type' : 'text/html'
        })
        res.end('<h1>Page not found<h1>')
    }

})

server.listen(8080, () => {
    console.log('listening on 8080')
})