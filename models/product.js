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
    constructor(title, price, imageURL, description) {
        this.title = title;
        this.imageURL = imageURL;
        this.price = price;
        this.description = description;
    }

    save () {
        this.id = Math.random().toString();
        getProductsFromFile(products => {
            console.log(products)
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
