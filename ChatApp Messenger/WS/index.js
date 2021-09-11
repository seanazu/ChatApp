const express = require('express')
const http = require ('http')
var cors = require('cors') ; 
var bodyParser = require('body-parser') ; 
const userBL = require('./models/userBL')
const douChatBL = require('./models/duoChatBL')

const PORT = process.env.PORT || 7000

const userController = require('./controllers/usersController')
const duoChatController = require('./controllers/duoChatController')
const groupController = require('./controllers/groupController')

const app = express() 

require('./configs/database')

const server = http.createServer(app)
const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

app.use(cors()) ; 
app.use(bodyParser.urlencoded({extended : true})).use(bodyParser.json()) ; 
app.use('/users',userController)
app.use('/duoChats', duoChatController)
app.use('/groups',groupController)


io.on('connection', (socket) =>{
    console.log('We Have A Connection!! ')

    socket.on('join',(room)=>{
        socket.join(room)
    })

    socket.on('sendMessage', (name, room ,message )=>{
        console.log(message);
    io.to(room).emit('message', {user: name, message:message})

    })
    socket.on('disconnect', ()=>{
        console.log('User Has Left!')
    })
});

server.listen(PORT,()=>{
    console.log("The Server Is Up")
})
