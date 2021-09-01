const UserSchema = require('../schemas/userSchema')

const getAllUsers = () =>{
    return new Promise ((resolve,reject) =>{
        UserSchema.find({},(err,data)=>{
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}


const getUserById = (id)=>{
    return new Promise((resolve,reject) =>{
        UserSchema.findById(id,(err,data)=>{
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}

const createNewUser = (newUser) =>{
    return new Promise((resolve,reject) =>{
        let user = new UserSchema({
            username: newUser.username , 
            password : newUser.password ,
            age : newUser.age ,
            city : newUser.city ,
            status : newUser.status ,
            image : newUser.image ,
            groups : newUser.groups , 
            duoChats : newUser.duoChats , 
            block : newUser.block
        })

        user.save(err=>{
            if(err){
                reject(err)
            }else{
                resolve("User Created")
            }
        })
    })
}

const updateUser = (id,updatedUser) =>{
    return new Promise ((resolve,reject)=>{
        UserSchema.findByIdAndUpdate(id,{
            username: updatedUser.username , 
            password : updatedUser.password ,
            age : updatedUser.age ,
            city : updatedUser.city ,
            status : updatedUser.status ,
            image : updatedUser.image ,
            groups : updatedUser.groups , 
            duoChats : updatedUser.duoChats , 
            block : updatedUser.block
        },(err)=>{
            if(err){
                reject(err)
            }else{
                resolve("User Updated")
            }
        })
    })
}

const deleteUser = (id)=>{
    return new Promise((resolve,reject) =>{
        UserSchema.findByIdAndDelete(id,(err)=>{
            if(err){
                reject(err)
            }else(
                resolve("User Deleted")
            )
        })
    })
}

module.exports = {getAllUsers,getUserById,createNewUser,updateUser,deleteUser}