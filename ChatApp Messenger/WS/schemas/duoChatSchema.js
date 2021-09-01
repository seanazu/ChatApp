
const mongoose = require('mongoose')
const appSchema = mongoose.Schema

const duoChatSchema  = new appSchema({
    _id : String , 
    user1 : String ,
    user2 : String ,
    chat : [
        {
            _id: false,
            userId : String , 
            message : String 
        }
    ]
})

module.exports = mongoose.model('duoChatSchema' , duoChatSchema)