const express = require('express')
const router = express.Router()
const Person = require('./../models/person')

router.post('/', async (req, res) => {

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
        res.status(500).json({ error: 'Internal seerver error "person-post" ' })
    }
})

router.get('/', async (req, res) => {
    try {
        const data = await Person.find()
        console.log("data Found")
        res.status(200).json(data)
    } catch (err) {
        console.log("error finding person:", err)
        res.status(500).json({ error: 'Internal seerver error "person-get"' })
    }
})

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            const response = await Person.find({work: workType})
            console.log("response fatched")
            res.status(200).json(response)
        } else {
            res.status(404).json({ error: 'invalid work type' })
        }
    } catch (err) {
        console.log(`error of finding worktype ${err}`)
        res.status(500).json({ error: 'internal server error "person-worktype"' })
    }
})

router.put('/:id', async (req,res)=>{
    try{
        const _id = req.params.id
        const updatedPersonData = req.body

        const responce = await Person.findByIdAndUpdate(_id, updatedPersonData, {
            new: true,
            runValidators: true
        })

        if(!responce) return res.status(404).json({error: 'Person Not Found'});
        console.log("updated-Person")
        res.status(200).json(responce)
    }catch(err){
        console.log(`error in updating person ${err}`)
        res.status(500).json({error: 'internal servar error "person-id"'})
    }
})

router.delete("/:id", async (req,res)=>{
    try{
        const _id = req.params.id
        const responce = await Person.findByIdAndDelete(_id)

        if(!responce) return res.status(404).json({error: 'Person Not Found'})

        console.log("deleted-Person")
        res.status(200).json(responce)
        
    }catch(err){
        console.log(err)
        res.status(500).json({error: 'internal server error "person-id"'})
    }
})

module.exports = router