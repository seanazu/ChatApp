const duoChatSchema = require('../schemas/duoChatSchema') 


const getAllDuoChats = () =>{
    return new Promise((resolve,reject) =>{
        duoChatSchema.find({},(err,data) =>{
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}

const getDuoChatsById = (id) =>{
    return new Promise((resolve,reject) =>{
        duoChatSchema.findById(id,(err,data) =>{
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}

const addDuoChat = (newChat) =>{
    return new Promise ((resolve,reject) =>{
        let duoChat = new duoChatSchema(newChat)
        duoChat.save(err=>{
            if(err){
                reject(err)
            }else{
                resolve("New Chat Created")
            }
        })
    })
}

const editDuoChat = (id,updatedData) =>{
    return new Promise ((resolve,reject) =>{
        duoChatSchema.findByIdAndUpdate(id,updatedData,(err) =>{
            if(err){
                reject(err)
            }else{
                resolve('Chat Updated')
            }
        })
    })
}

const deleteDuoChat = (id) =>{
    return new Promise((resolve,reject) =>{
        duoChatSchema.findByIdAndDelete(id,(err)=>{
            if(err){
                reject(err)
            }else{
                resolve("Conversation deleted")
            }
        })
    })
}

module.exports = {getAllDuoChats,getDuoChatsById,addDuoChat,editDuoChat,deleteDuoChat}
