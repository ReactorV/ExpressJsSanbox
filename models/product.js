const fs = require('fs');
const path = require('path');

module.exports = class Product {
    constructor(titleText) {
        this.title = titleText;
    }

    save () {
        const pathToData = path.join(
            path.dirname(process.mainModule.filename),
            'data',
            'products.json'
        )

        fs.readFile(pathToData, (err, fileContent) => {
            const products = err ? [] : JSON.parse(fileContent);

            products.push(this);
            fs.writeFile(pathToData, JSON.stringify(products), (err) => {
                console.error(err)
            })
        })
    }

    static fetchAll (cb) {
        const pathToData = path.join(
            path.dirname(process.mainModule.filename),
            'data',
            'products.json'
        )

        fs.readFile(pathToData, (err, fileContent) => {
            return err ? cb([]) : cb(JSON.parse(fileContent))
        })
    };
}
