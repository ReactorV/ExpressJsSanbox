const express = require("express")

const app = express()

app.use("/", (req, res, next) => {
    console.log("This Always runs")
    next()
})

app.use("/add-products", (req, res, next) => {
    console.log("Add products page")
    res.send("<h1>Add products page</h1>")
})

app.use("/", (req, res, next) => {
    console.log("Hello from ExpressJS")
    res.send("<h1>Hello from ExpressJS!)</h1>")
})

app.listen(3001)