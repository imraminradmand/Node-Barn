const fs = require('fs',)
const http = require('http')
const url = require('url')


const data = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {
    const pathName = req.url

    if (pathName === '/overview' || pathName === '/') {
        res.end('overview')
    } else if (pathName === '/product') {
        res.end('Product')
    } else if (pathName ==='/api'){
        res.writeHead(200, {
            "Content-type": "application/json"
        })
        res.end(data)
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