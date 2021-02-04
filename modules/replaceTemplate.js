module.exports = (template, product) => {
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