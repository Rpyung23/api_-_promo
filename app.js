require("./config/port")
const express = require("express")
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const user = require("./view/user")
const client = require("./view/client")
const busniess = require("./view/busniess")

app.use(user)
app.use(client)
app.use(busniess)

app.listen(process.env.PORT,()=>{
    console.log(`SERVER API ${process.env.PORT}`)
})