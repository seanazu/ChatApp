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
        margin:'auto',
        width:'450px', 
        boxShadow: '0 8px 12px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
      },
      media: {
        height: 140,
      },
      Buttons :{
        display:'flex',
        justifyContent:'center'
      }
});

const UsersComp = () => {
    const classes = useStyles();
    const[users,setUsers] = useState([])
    const[connectedUser, setUser] = useState({})
    const[search,setSearch] = useState('')
    const[find,setFind] = useState('')

    const id = sessionStorage.getItem('id')
   

    useEffect (async()=>{
        const users = await axios.get('http://localhost:7000/users')
        const filteredUsers = users.data.filter(item=>item._id !== id)
        setUsers(filteredUsers)
        const user = await axios.get('http://localhost:7000/users/' + id)
        setUser(user.data) 

    },[])

    const findUser = () =>{
      setFind(search)
    }

  

    let usersObj = users.map( (user,index) =>{
      let id = sessionStorage.getItem('id')
      let blocked = false ; 
      if(connectedUser.block !== undefined){
      connectedUser.block.map(item =>{
        if(item.userId == user._id){
          blocked = true
        } 
      })
      console.log(connectedUser.block);
      }
      console.log(blocked);
      let displayUser = 'none'
      if(user.username.toLowerCase().includes(find.toLowerCase()) && blocked == false){
        displayUser='unset'
      }
        return (
            <div key={index} style={{display:displayUser}}>
               
            <Card  className={classes.root} >
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {user.username}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              City:{user.city}
              </Typography>
            </CardContent>
          <CardActions className={classes.Buttons} >
          <Button variant="contained" color="primary" onClick={ async()=>{
            let duoChats = await axios.get('http://localhost:7000/duoChats')
            let duoChat = duoChats.data.filter(chat=> chat._id == user._id + id ||chat._id == id + user._id)
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
          }} > Chat</Button>
          <Button variant="contained" color='primary' onClick={async()=>{
            console.log({...connectedUser, block:[{userId:user._id}]});
            const resp = await axios.put('http://localhost:7000/users/'+ id ,{...connectedUser, block:[{userId:user._id}]}) ;
            alert(resp.data)
          }} > Block </Button>
          <br/>
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
             <br/>
             <br/>
            {usersObj}
        </div>
    );
};

export default UsersComp;
