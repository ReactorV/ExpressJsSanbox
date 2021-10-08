const products = [];

module.exports = class Product {
    constructor(titleText) {
        this.title = titleText;
    }

    save () {
        products.push(this)
    }

    static fetchAll () {
        return products
    }
}
