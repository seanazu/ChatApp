const groupSchema = require('../schemas/groupSchema')


const getAllGroups = () =>{
    return new Promise((resolve,reject) =>{
        groupSchema.find({}, (err,data) =>{
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}

const getGroupById = (id) =>{
    return new Promise((resolve,reject) =>{
        groupSchema.findById(id,(err,data) =>{
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}

const addGroup = (newGroup) =>{
    return new Promise((resolve,reject) =>{
        let group = new groupSchema ({
             _id : newGroup._id , 
             members : newGroup.members,
             managers : newGroup.managers , 
             name : newGroup.name ,
             image : newGroup.image ,
             status : newGroup.status ,
             chat : newGroup.chat 
        })
        group.save(err =>{
            if(err){
                reject(err)
            }else{
                resolve("New Group Created")
            }
        })
    })
}

const editGroup = (id,updatedGroup) =>{
    return new Promise ((resolve,reject) =>{
        groupSchema.findByIdAndUpdate(id,{
            _id : updatedGroup._id , 
            members : updatedGroup.members,
            managers : updatedGroup.managers , 
            name : updatedGroup.name ,
            image : updatedGroup.image ,
            status : updatedGroup.status ,
            chat : updatedGroup.chat 
        },(err) =>{
            if(err){
                reject(err)
            }else{
                resolve("Group Updated")
            }
        })
    })
}

const deleteGroup = (id) =>{
    return new Promise ((resolve,reject) => {
        groupSchema.findByIdAndDelete(id,(err) =>{
            if(err){
                reject(err)
            }else{
                resolve("Group Deleted")
            }
        })
    })
}

module.exports = {getAllGroups,getGroupById,addGroup,editGroup,deleteGroup}