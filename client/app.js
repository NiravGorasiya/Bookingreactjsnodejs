require('dotenv').config()
const express = require('express')
const app = express()

const hotel = require("./routes/Hotels")
app.get('/', (req, res) => {
    res.send('Hello World!')
})

//Middleware
app.use(express.json())
app.use("/api/hotel", hotel)

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})