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
        let user = new UserSchema(newUser)
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
        UserSchema.findByIdAndUpdate(id,updatedUser,(err)=>{
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
