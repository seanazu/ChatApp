
const mongoose = require('mongoose')
const appSchema = mongoose.Schema

const groupSchema = new appSchema({
    _id : String , 
    members : [
        {
            _id: false,
            userId : String , 
            username: String 
        }
    ],
    managers : [
        {
            _id: false,
            userId : String
        }
    ],
    name : String ,
    image : String ,
    status : String ,
    chat :[
        {
            _id: false,
            userId : String , 
            message : String
        }
    ]
    
})

module.exports = mongoose.model('group', groupSchema)