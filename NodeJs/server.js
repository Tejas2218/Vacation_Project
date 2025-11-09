const express = require('express')
const app = express()
const db = require('./db')
const bodyParser = require('body-parser');
app.use(bodyParser.json())


app.get('/', function (req, res) {
    res.send("Welcome to my hotel, How can i help you")
})

//import the router file
const personRoutes = require("./routes/personRoutes")
const manuRoutes = require('./routes/manuRoutes')

//use the router file
app.use("/person",personRoutes)
app.use("/manu",manuRoutes)

app.listen(3000, () => {
    console.log(`server is running in port: 3000`)
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

