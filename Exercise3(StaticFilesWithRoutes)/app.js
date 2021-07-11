const path = require("path")

const express = require("express")

const mainRoute = require("./routes/main")
const usersRoute = require("./routes/users")

const app = express()

app.use(express.static(path.join(__dirname, "public")))

app.use("/admin", usersRoute)
app.use(mainRoute)

app.listen(3002)
