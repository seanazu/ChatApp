

const mongoose = require('mongoose') ;
const appSchema = mongoose.Schema ;

const userSchema = new appSchema({
    username: String , 
    password : String ,
    age : String ,
    city : String ,
    status : String ,
    image : String , 
    block : [
        {
            _id: false,
            userId: String 
        }
    ] 
})

module.exports = mongoose.model('user', userSchema)
