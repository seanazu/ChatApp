import React, { useEffect,useState } from 'react';
import './ChatBoxComp.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import io from 'socket.io-client';
import axios from 'axios'

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
    sendMessageCard : {
      margin:'auto',
      width:'350px'
    }
});

const ChatBoxComp = (props) => {
  const classes = useStyles();
  const ENDPOINT = 'http://localhost:7000'
  const[duoChat ,setChat ] = useState({})
  const[message,setMessage] = useState('')
  const[messages, setMessages] = useState([]);

  const room = props.match.params.room  
  const name = props.match.params.username 
  const id = props.match.params.userId 
  const socket;

  useEffect( ()=>{
      socket = io(ENDPOINT)
      socket.emit('join',room)
     
    },[ENDPOINT])

   useEffect(async() => {
    socket.on('message', message =>{
      setMessages(messages => [...messages, message])
    })
    const duoChat = await axios.get('http://localhost:7000/duoChats/'+room)
    setMessages(duoChat.data.chat)
    setChat(duoChat.data)
  }, [])
 

  

  const sendMessage =async (e) =>{
    e.preventDefault()
    const messageObj = {
      userId : sessionStorage.getItem('id'),
      message : message
    }
    let chatArray = duoChat.chat 
    chatArray.push(messageObj)
    const duoChatObj = {
      _id: duoChat._id , 
      user1 : duoChat.user1 ,
      user2 :  duoChat.user2 ,
      chat : chatArray
    }
    const resp = await axios.put('http://localhost:7000/duoChats/'+room, duoChatObj)
    alert(resp.data)
    if(message){
      socket.emit('sendMessage',name, room, message ,() =>{setMessage('')}) 
    }

  }


  const messagesObj = messages.map((item,index) =>{
    let messageClass = "yours messages"
    if(item.userId == id || item.user == name){
      messageClass = "mine messages"
    }
    return(
      <div key={index} className={messageClass}>
      <div className="message last">
        {item.message}
       </div>
    </div>
    )
  })

    return (
      <div>
         <br/> 
         <Card className={classes.root} >
            <CardContent>
              
               {messagesObj}
              <Typography variant="body2" color="textSecondary" component="p">

              </Typography>
            </CardContent>
         
         
        </Card> 
        <Card >
        <CardActions className={classes.sendMessageCard} >
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

export default ChatBoxComp;
