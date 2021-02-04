const fs = require('fs',)
const http = require('http')
const url = require('url')


const replaceTemplate = (template, product) => {
    let output = template.replace(/{%product_name%}/g, product.productName)
    output = output.replace(/{%location%}/g, product.from)
    output = output.replace(/{%emoji%}/g, product.image)
    output = output.replace(/{%ingridents%}/g, product.nutrients)
    output = output.replace(/{%price%}/g, product.price)
    output = output.replace(/{%description%}/g, product.description)
    output = output.replace(/{%ID%}/g, product.id)
    output = output.replace(/{%quantity%}/g, product.quantity)

    if(!product.organic) {
        output = output.replace(/{%not_organic%}/g, 'not-organic')
    }
    return output
}
// replaces empty card with actual products

const data = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8')
const overviewTemplate = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8')
const productTemplate = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8')
const cardTemplate = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8')
// doin sync functions cause its top level and it'll only be read in once

const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true)
    // overview page
    if (pathname === '/overview' || pathname === '/') {
        res.writeHead(200, {
            "Content-type": "text/html"
        })

        const overviewCards = dataObj.map(el => replaceTemplate(cardTemplate, el)).join('')
        const actualOverviewPage = overviewTemplate.replace('{%card%}', overviewCards)

        res.end(actualOverviewPage)

    //products page
    } else if (pathname === '/product') {
        res.writeHead(200, {
            "Content-type": "text/html"
        })

        const productToShow = dataObj[query.id]
        const actualProductPage = replaceTemplate(productTemplate, productToShow)

        res.end(actualProductPage)

    //API
    } else if (pathname ==='/api'){
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