const requestHandler = (req, res) => {
    const url = req.url
    const method = req.method

    if (url === "/") {
        res.setHeader('Content-Type', 'text/html')
        res.write("<html>")
        res.write('<head><title>App</title></head>')
        res.write('<body><h1>Welcome to my page</h1>' +
            '<form action="/create-user" method="POST">' +
            '   <input type="text" name="username" placeholder="username">' +
            '   <button type="submit">Create user</button>' +
            '</form>' +
            '</body>')
        res.write("</html>")
        res.end()
    }

    if (url === "/users") {
        res.setHeader('Content-Type', 'text/html')
        res.write("<html>")
        res.write('<head><title>Users</title></head>')
        res.write('<body><h1>Users</h1><ul><li>user 1</li><li>user 2</li><li>user 3</li></ul></body>')
        res.write("</html>")
        res.end()
    }

    if (url === "/create-user" && method === "POST") {
        const data = []
        req.on("data", (chunk) => data.push(chunk))
        req.on("end", () => {
            const parsedData = Buffer.concat(data).toString()
            const userName = parsedData.split("=")[1]
            console.log(userName)

        })
        res.statusCode = 302
        res.setHeader("Location", "/")
        res.end()
    }

    console.log("Server is spinning up at PORT 3001")
}

module.exports = requestHandler
