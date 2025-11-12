const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const Person = require('./models/person')

passport.use(new localStrategy( async (username, password, done) => {
    //authentication logic
    try{
        // console.log("Recived credentials",username,password)
        const user = await Person.findOne({username: username})

        //done function is take 3 paarameters done(error,user, info)
        if(!user) return done(null, false, {message: 'Incorrect username'})
        
        const isPasswordMatched = await user.comparePassword(password)

        if(isPasswordMatched) 
            return done(null, user)
        else  
            done(null, false, {message: 'Incorrect password'})

    }catch(err){
        return done(err)
    }
}))

module.exports = passport