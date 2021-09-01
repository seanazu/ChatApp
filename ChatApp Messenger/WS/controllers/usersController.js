const express = require('express')
const Router = express.Router()
const userBL = require('../models/userBL')

Router.route('/').get(async (req,resp) =>{
    const users = await userBL.getAllUsers() ;
    return resp.json(users)
})

Router.route('/:id').get(async (req,resp) =>{
    const id = req.params.id ;
    const user = await userBL.getUserById(id) ;
    return resp.json(user) 
})

Router.route('/').post(async (req,resp) =>{
    const obj = req.body 
    const response = await userBL.createNewUser(obj) 
    return resp.json(response)
})

Router.route('/:id').put(async (req,resp) =>{
    const id = req.params.id 
    const obj = req.body 
    const response = await userBL.updateUser(id,obj) ;
    return resp.json(response)
})

Router.route('/:id').delete(async (req,resp) =>{
    const id = req.params.id 
    const response = await userBL.deleteUser(id) 
    return resp.json(response)
})

module.exports = Router 


