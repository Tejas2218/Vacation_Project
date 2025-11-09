const express = require('express')
const router = express.Router();
const manuItem = require('./../models/manu')

router.get("/", async (req, res) => {
    try {
        const data = await manuItem.find()
        console.log("data found")
        res.status(200).json(data)
    } catch (err) {
        console.log("error finding manu", err)
        res.status(500).json({ error: 'internal server error "manu-get"' })
    }
})

router.post("/", async (req, res) => {
    try {
        const data = req.body

        const newManu = new manuItem(data)

        const response = await newManu.save()
        console.log(`Data add Succesfully ${data}`)
        res.status(200).json(data)

    } catch (err) {
        console.log(`error of saving data in manu ${err}`)
        res.status(500).json({ error: 'internal server error "manu-post"' })
    }
})

router.get('/:taste', async (req,res)=>{
    try{
        const tasteType = req.params.taste
        if(tasteType == "spicy" || tasteType == "sweet" || tasteType == "sour"){
            const responce = await manuItem.find({taste:tasteType})
            console.log("response fatched")
            res.status(200).json(responce)
        }else{
            res.status(404).json({error: 'data not found'})
        }
    }catch(err){
        console.log(`error of founding taste ${err}`)
        res.status(500).json({error: 'internal server error "/:taste"'})    
    }
})

router.put('/:id', async (req,res)=>{
    try{
        const _id = req.params.id
        const updatedManuData = req.body
        const responce = await manuItem.findByIdAndUpdate(_id,updatedManuData, {
            new: true,
            runValidators: true
        })

        if(!responce) return res.status(404).json({error: 'Manu Not found'})
        
        console.log("Updated-Manu")
        res.status(200).json(responce)
    }catch(err){
        console.log(err)
        res.status(500).json({error: 'internal server error "manu-id"'})
    }
})

router.delete('/:id', async (req,res)=>{
    try{
        const _id = req.params.id
        const responce = await manuItem.findByIdAndDelete(_id)

        if(!responce) return res.status(404).json({error: 'Manu Not Found'})
    
        console.log("Deleted-Manu")
        res.status(200).json(responce)
    }catch(err){
        console.log(err)
        res.status(500).json({error: 'internal server error "manu-id"'})
    }
})

module.exports = router