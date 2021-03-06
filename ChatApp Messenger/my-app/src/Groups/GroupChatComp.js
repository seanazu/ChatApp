import React, { useEffect, useState } from 'react';
import './GroupChatComp.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import io, { Socket } from 'socket.io-client';
import axios from 'axios'


let socket;

const useStyles = makeStyles({
    root: {
        maxWidth: 450,
        margin:'auto',
        width:'450px', 
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
      },
      media: {
        height: 140,
      },
      sendMessageCard :{
       margin:'auto',
       width:'350px'
      },
      deleteButton : {
          display:'flex',
          justifyContent:'flex-end'
      }
  });
  

const GroupChatComp = (props) => {
    const classes = useStyles();
    const ENDPOINT = 'http://localhost:7000'
    const[chat ,setChat ] = useState({})
    const[message,setMessage] = useState('')
    const[messages, setMessages] = useState([]);

    const room = props.match.params.room
    const name = props.match.params.username
    const id = props.match.params.userId

    useEffect(()=>{
        socket = io(ENDPOINT)
        socket.emit('join',room)
    },[ENDPOINT])

    useEffect(() =>{
        socket.on('message',message =>{
            setMessages(messages => [...messages, message])
        })
        axios.get('http://localhost:7000/groups/'+room).then(chat=>{
        setMessages(chat.data.chat)
        setChat(chat.data)   
        })
        
    },[])

    const sendMessage = (e) =>{
        e.preventDefault()
        const messageObj = {
            userId:id,
            message:message,
            username : name
        }
        let chatArray = chat.chat
        chatArray.push(messageObj)
        const groupObj = {...chat, messages:chatArray}
        axios.put('http://localhost:7000/groups/' + room, groupObj).then(resp=>{
            alert(resp.data)
        })
        if(message){
            socket.emit('sendMessage', name,room,message,()=>setMessage(''))
        }
    }

    let messageObj = messages.map((item,index) =>{
        let messageClass = "yours messages"
        if(item.userId == id || item.user == name){
            messageClass = "mine messages"
        }
        let fromDisplay = "unset"
        if(item.username == undefined){
            fromDisplay="none"
        }
        
         return(
            <div key={index} className={messageClass} >
                <div className="message last">
                    {item.message}<br/>
                  <span style={{display:fromDisplay}}> from: {item.username}</span>
                </div>
            </div>
        )
    })


    return (
        <div>
            <Button variant="outlined" color="secondary" className={classes.deleteButton}>Delete Group</Button>
               <br/> 
            <Card className={classes.root} >
                <CardContent>
                    {messageObj}
                    <Typography variant="body2" color="textSecondary" component="p">

              </Typography>
                </CardContent>
            </Card>

        <Card className={classes.sendMessageCard}>
        <CardActions >
         <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            placeholder="Send Messsage..."
            autoComplete="username"
            autoFocus
            onChange = {(e)=>setMessage(e.target.value)}
             />
          <Button variant="contained" color="primary" onClick={sendMessage} > Send</Button><br/>
          </CardActions>
        </Card>
 
        </div>
    );
};

export default GroupChatComp;
