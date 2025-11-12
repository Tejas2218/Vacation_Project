const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const personSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
    },
    work: {
        type: String,
        enum: ['chef', 'waiter','manager'],
        require: true
    },
    mobile: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    address:{
        type: String
    },
    salary: {
        type: Number,
        require: true
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
})

personSchema.pre('save', async function(next){
    const person = this

    // hash the password only if it has been modified (or it new)
    if(!person.isModified('password')) return next()
    try{
        //hash password generation
        const salt = await bcrypt.genSalt(10)
        
        // hash password
        const hashPassword = await bcrypt.hash(person.password, salt)
        person.password = hashPassword       
        next()
    }catch(err){
        return next(err)
    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch
    }catch(err){

    }
}

//in DB
// tejasPithva(password) ---> skeruifjopsi9p0wdhnfsjka30

// login ---> tejasPithva
// skeruifjopsi9p0wdhnfsjka30 -> extract salt
// salt + tejasPithva -> hash -> skeruifjopsi9p0wdhnfsjka30

// skeruifjopsi9p0wdhnfsjka30 == skeruifjopsi9p0wdhnfsjka30 (true) login

/* 
    compare function check this ( tejasPithva(password)---> skeruifjopsi9p0wdhnfsjka30 ) is
    equal to ( salt + tejasPithva -> hash -> skeruifjopsi9p0wdhnfsjka30 )
*/

// in DB
// tejasPithva(password) ---> skeruifjopsi9p0wdhnfsjka30
// login tejas1618
// skeruifjopsi9p0wdhnfsjka30 -> etract salt from db's password
// salt + tejas1618 -> hash -> bvcw8cnq38ofbvc0q9fcbw9

// skeruifjopsi9p0wdhnfsjka30 == bvcw8cnq38ofbvc0q9fcbw9 (false) not login

// create a Person model
const Person = mongoose.model('person',personSchema);
module.exports = Person