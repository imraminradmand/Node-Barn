const fs = require('fs',)
const http = require('http')
const url = require('url')


const data = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8')
const overviewTemplate = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8')
const productTemplate = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8')
const cardTemplate = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8')
// doin sync functions cause its top level and it'll only be read in once

const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {
    const pathName = req.url
    // overview page
    if (pathName === '/overview' || pathName === '/') {
        res.writeHead(200, {
            "Content-type": "text/html"
        })
        res.end(overviewTemplate)

    //products page
    } else if (pathName === '/product') {
        res.end('Product')

    //API
    } else if (pathName ==='/api'){
        res.writeHead(200, {
            "Content-type": "application/json"
        })
        res.end(data)

    // 404 Not found
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