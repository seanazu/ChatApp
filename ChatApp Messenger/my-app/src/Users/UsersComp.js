import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import history from '../history';
import TextField  from '@material-ui/core/TextField';


const useStyles = makeStyles({
    root: {
        maxWidth: 450,
      },
      media: {
        height: 140,
      },
});

const UsersComp = () => {
    const classes = useStyles();
    const[users,setUsers] = useState([])
    const[connectedUser, setUser] = useState({})
    const[search,setSearch] = useState('')
    const[find,setFind] = useState('')
    const[boolean,setBoolean] = useState(false)
   

    useEffect (async()=>{
        let users = await axios.get('http://localhost:7000/users')
        let id = sessionStorage.getItem('id')
        let filteredUsers = users.data.filter(item=>item._id !== id)
        setUsers(filteredUsers)
        let user = await axios.get('http://localhost:7000/users/' + id)
        setUser(user.data) 

    },[])

    const findUser = () =>{
      setFind(search)
    }


  ///------------------/////

  
  let usersObj = users.map( (user,index) =>{
    let id = sessionStorage.getItem('id')
    let displayUser = 'none'
   
      if(user.username.toLowerCase().includes(find.toLowerCase())){
        displayUser='unset'
      }
      console.log(displayUser)

        return (
            <div key={index} style={{display:displayUser}}>
               
            <Card  className={classes.root} style={{margin:'auto',width:'450px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {user.username}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              City:{user.city}
              </Typography>
            </CardContent>
          <CardActions style={{display: 'block' , margin:' auto'}}>
          <Button variant="contained" color="primary" onClick={ async()=>{
            let duoChats = await axios.get('http://localhost:7000/duoChats')
            let duoChat = duoChats.data.filter(chat=> chat._id == user._id + id ||chat._id == id + user._id)
            console.log(duoChat);
            if(duoChat == false){
              let newChat = {
                _id : user._id + id ,
                user1: id,
                user2: user._id ,
                chat : []
              }
              let resp = await axios.post('http://localhost:7000/duoChats',newChat)
              alert(resp.data);
              history.push(`/mainpage/chatBoxComp/${newChat._id}/${id}/${connectedUser.username}`)
            }else if(duoChat){
              history.push(`/mainpage/chatBoxComp/${duoChat[0]._id}/${id}/${connectedUser.username}`)
          }
          }} > Chat</Button><br/>
          </CardActions>
        </Card>
        <br/>
        </div>
        )
    })

    return (
        <div>
           <br/>
              <TextField id="standard-basic" label='search' style={{margin:'auto'}} onChange={(e)=>{
                setSearch(e.target.value)
                setFind('')
              }
                 }/>{' '}
             <Button variant="contained" color="primary" onClick={findUser} > Find User</Button>
             <button onClick={(e)=>{
               e.preventDefault()
                     setBoolean((prev)=> !prev);
                     console.log("boolean",boolean)
             }}>learning</button>
             <br/>
             <br/>
            {usersObj}
        </div>
    );
};

export default UsersComp;