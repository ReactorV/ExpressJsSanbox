const http = require("http")

const routes = require("./routs")

const server = http.createServer(routes)

server.listen(4000)
