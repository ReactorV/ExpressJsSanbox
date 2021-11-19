const fs = require('fs');
const path = require('path');

const pathToCart = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
)

module.exports = class Cart {
    static addProduct(id, productPrice) {
        let cart = { products: [], totalPrice: 0 };
        //Fetch previous cart
        fs.readFile(pathToCart, (error, fileContent) => {
            if (!error) {
                cart = JSON.parse(fileContent)
            }
        })

        //Analyze cart = find the product
        const existingProductIdx = cart.products.findIndex(prod => prod.id === id);
        const existingProduct = cart.products[existingProductIdx];
        let updatedProduct

        //Add new product or increase quantity
        if (existingProduct) {
            updatedProduct = {
                ...existingProduct,
                qty: existingProduct.qty + 1
            }
            cart.products = [...cart.products];
            cart.products[existingProductIdx] = updatedProduct;
        } else {
            updatedProduct = { id, qty: 1 };
            cart.products = [...cart.products, updatedProduct];
        }

        cart.totalPrice = cart.totalPrice + productPrice
        fs.writeFile(pathToCart, JSON.stringify(cart), error => {
            console.error(error)
        })
    }
}