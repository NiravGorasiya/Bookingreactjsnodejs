require('dotenv').config()
const express = require('express')
const app = express()

const hotel = require("./routes/Hotels")
const user = require("./routes/Users")
const room = require("./routes/Room")
const auth = require("./routes/Auth")
//database conntected
require("./db/database")

//test api
app.get('/', (req, res) => {
    res.send('Hello World!')
})

//Middleware
app.use(express.json())
app.use("/api/hotel", hotel)
app.use("/api/user", user)
app.use("/api/room", room)
app.use("/api/user", auth)

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})