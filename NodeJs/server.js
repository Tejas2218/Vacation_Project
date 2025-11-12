const express = require('express')
const app = express()
const db = require('./db')
const passport = require('./auth')

const bodyParser = require('body-parser');
app.use(bodyParser.json())

require('dotenv').config()

const PORT = process.env.PORT || 3000

//Middeleware Function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request made to: ${req.originalUrl}`)
    next()
}

app.use(logRequest) 

app.use(passport.initialize())

const localAuthMiddleware = passport.authenticate('local', {session: false})

app.get('/', function (req, res) {
    res.send("Welcome to my hotel, How can i help you")
})

//import the router file
const personRoutes = require("./routes/personRoutes")
const manuRoutes = require('./routes/manuRoutes')

//use the router file
app.use("/person",localAuthMiddleware , personRoutes)
app.use("/manu", manuRoutes)

app.listen(PORT, () => {
    console.log(`server is running in port: ${PORT}`)
})













// app.get('/panjabi',(req,res)=>{
//     res.send('sure sir, i would love to serve panjabi')
// })

// app.get('/dhosa',(req,res)=>{
//     var coustomise_dhosa = {
//         name: "Maisur dhosa",
//         size: "55cm diamitter",
//         sambhar: true,
//         chatni: true
//     }
//     res.send(coustomise_dhosa)
//     res.send('sure sir,welcome to south india, i would love to serve dhosa')
// })

// app.post('/items',(req,res)=>{
//     console.log("data is seved")
//     res.send("data is seved")
// })



// console.log("hello worldddd")
// var fs  = require("fs")
// var os  = require("os")

// var user = os.userInfo()
// console.log(user)
// console.log(user.username)
// console.log("hi")

