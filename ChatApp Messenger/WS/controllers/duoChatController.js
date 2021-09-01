const express = require('express')
const Router = express.Router()
const duoChatBL = require('../models/duoChatBL')

Router.route('/').get(async (req,resp) =>{
    const duoChats = await duoChatBL.getAllDuoChats() ;
    return resp.json(duoChats)
})

Router.route('/:id').get(async (req,resp) =>{
    const id = req.params.id ;
    const duoChat = await duoChatBL.getDuoChatsById(id) ;
    return resp.json(duoChat) 
})

Router.route('/').post(async (req,resp) =>{
    const obj = req.body 
    const response = await duoChatBL.addDuoChat(obj) 
    return resp.json(response)
})

Router.route('/:id').put(async (req,resp) =>{
    const id = req.params.id 
    const obj = req.body 
    const response = await duoChatBL.editDuoChat(id,obj) ;
    return resp.json(response)
})

Router.route('/:id').delete(async (req,resp) =>{
    const id = req.params.id 
    const response = await duoChatBL.deleteDuoChat(id) 
    return resp.json(response)
})

module.exports = Router 