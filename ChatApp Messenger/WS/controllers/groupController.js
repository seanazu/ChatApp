const express = require('express')
const Router = express.Router()
const groupBL = require('../models/groupBL')

Router.route('/').get(async (req,resp) =>{
    const groups = await groupBL.getAllGroups() ;
    return resp.json(groups)
})

Router.route('/:id').get(async (req,resp) =>{
    const id = req.params.id ;
    const group = await groupBL.getGroupById(id) ;
    return resp.json(group) 
})

Router.route('/').post(async (req,resp) =>{
    const obj = req.body 
    const response = await groupBL.addGroup(obj) 
    return resp.json(response)
})

Router.route('/:id').put(async (req,resp) =>{
    const id = req.params.id 
    const obj = req.body 
    const response = await groupBL.editGroup(id,obj) ;
    return resp.json(response)
})

Router.route('/:id').delete(async (req,resp) =>{
    const id = req.params.id 
    const response = await groupBL.deleteGroup(id) 
    return resp.json(response)
})

module.exports = Router 

