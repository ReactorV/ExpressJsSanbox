const fs = require('fs');
const path = require('path');

const pathToData = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
)

const getProductsFromFile = (cb) => {
    fs.readFile(pathToData, (err, fileContent) => {
        return err ? cb([]) : cb(JSON.parse(fileContent))
    })
}

module.exports = class Product {
    constructor(titleText) {
        this.title = titleText;
    }

    save () {
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(pathToData, JSON.stringify(products), (err) => {
                console.error(err)
            })
        })

    }

    static fetchAll (cb) {
        getProductsFromFile(cb)
    };
}
