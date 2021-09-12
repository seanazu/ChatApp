import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';



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
      group : {
        display:'flex',
        justifyContent:'center'
      },
      groupImage :{
        width:'70px',
        height:'70px',
        borderRadius:'70px',
      }
});



const GroupsComp = () => {
    const classes = useStyles()
    const[groups,setGroups] = useState([])
    const[user, setUser] = useState({})
    const[search,setSearch] = useState('')
    const[find,setFind] = useState('')
    
    useEffect (async()=>{
        let groups = await axios.get('http://localhost:7000/groups')
        setGroups(groups.data)
        let user = await axios.get('http://localhost:7000/users/' + sessionStorage.getItem('id'))
        setUser(user.data)
    },[])

    const findGroup =() =>{
      setFind(search)
    }

    let usersObj = groups.map((group,index) =>{
      let checkIfUserInGroup = false
      group.members.map(member=>{
        if(member.username == user.username){
          checkIfUserInGroup =  true
        }
      })
      console.log(find);
      let groupDisplay = 'none';
      if(checkIfUserInGroup == true && group.name.toLowerCase().includes(find.toLowerCase()) ){
        groupDisplay="unset"
      }else if(checkIfUserInGroup == false){
        groupDisplay='none'
      }
        return (
            <div key={index} style={{display:groupDisplay}}>
               
            <Card  className={classes.root} >
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {group.name}
                <img src={group.image} className={classes.groupImage} alt="No Image"/>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              Status:{group.status}
              </Typography>
            </CardContent>
          <CardActions className={classes.group} >
          <Link to={`/mainpage/groupChatComp/${group._id}/${user._id}/${user.username}`} ><Button variant="contained" color="primary"> Chat</Button></Link><br/>
          </CardActions>
        </Card>
        <br/>
        </div>
        )
    })



    return (
        <div>
            <br/>
            <br/>
            <Link to="/mainpage/createGroup"><Button variant="contained" color="primary"  > Create Group </Button></Link>{' '}
            <TextField id="standard-basic" label='search' onChange={(e)=>{
              setSearch(e.target.value) ;
              setFind('')
            }} />{' '}
             <Button variant="contained" color="primary" onClick={findGroup} > Find Group</Button>
            {usersObj}
        </div>
    );
};

export default GroupsComp;
