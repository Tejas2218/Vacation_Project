const express = require('express')
const app = express()
const db = require('./db')
const Person = require('./models/person')
const bodyParser = require('body-parser');
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.send("Welcome to my hotel")
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

app.post('/person', async (req, res) => {

    try {

        const data = req.body

        const newPerson = new Person(data)

        const response = await newPerson.save()
        console.log("data saved")
        res.status(200).json(response)

        // newPerson.save((error, savedPerson) => {
        //     if (error) {
        //         console.log("error saving person:", error)
        //         res.status(500).json({ error: 'Internal seerver error' })
        //     } else {
        //         console.log("data save succesfully")
        //         res.status(200).json(savedPerson)
        //     }
        // })
        //depricated

    } catch (err) {
        console.log("error saving person:", err)
        res.status(500).json({ error: 'Internal seerver error' })
    }


})

app.get('/person', async (req,res)=>{
    try{
        const data = await Person.find()
        console.log("data Found")
        res.status(200).json(data)
    }catch(err){
        console.log("error finding person:", err)
        res.status(500).json({ error: 'Internal seerver error' })
    }
})

app.listen(3000, () => {
    console.log(`server is running in port: 3000`)
})

















// console.log("hello worldddd")
// var fs  = require("fs")
// var os  = require("os")

// var user = os.userInfo()
// console.log(user)
// console.log(user.username)
// console.log("hi")

