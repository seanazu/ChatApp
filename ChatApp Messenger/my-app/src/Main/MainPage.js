import React, { useEffect } from 'react';
import {Switch, Route, Link } from 'react-router-dom';
import UsersComp from '../Users/UsersComp'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import history from '../history';
import GroupsComp from '../Groups/GroupsComp';
import ChatBoxComp from '../Private Chats/ChatBoxComp'
import UserInfoComp from '../User Info/UserInfoComp';
import CreateGroupComp from '../Groups/CreateGroupComp';
import GroupChatComp from '../Groups/GroupChatComp';
import { makeStyles } from '@material-ui/core/styles';
import EditGroupComp from '../Groups/EditGroupComp';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
  paper : {

  },
  logOut:{
    float:'right'
    }
});



const MainPage = (props) => {
  const classes = useStyles()
  const [value, setValue] = React.useState(2);

  useEffect(()=>{
   const id = props.match.params.id
   if(id == false){
     history.push('/')
   }
    
  },[])


  const handleChange = ( event,newValue) => {
    setValue(newValue);
  };
    return (
        <div >
            <br/>
            <br/>
            <br/>
            <br/>
            <span > 
            </span>
            <br/>
            <br/> 
              <Paper square >
              <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="disabled tabs example"
               
              >
                <Tab label="Private Chats" onClick={()=> history.push('/mainpage/usersComp')} />
                <Tab label="Groups" onClick={()=> history.push('/mainpage/groupsComp')}  />
                <Tab label="My Info" onClick={()=> history.push('/mainpage/userInfo')}/>
              </Tabs>
            </Paper>


            <Switch>
                <Route path= "/mainpage/usersComp" component={UsersComp} />
                <Route path= "/mainpage/groupsComp" component={GroupsComp} />
                <Route path= "/mainpage/groupChatComp/:room/:userId/:username" component={GroupChatComp} />
                <Route path= "/mainpage/createGroup" component={CreateGroupComp} />
                <Route path= "/mainpage/editGroupComp/:groupId" component={EditGroupComp} />
                <Route path= "/mainpage/chatBoxComp/:room/:userId/:username" component={ChatBoxComp} />
                <Route path= "/mainpage/userInfo" component={UserInfoComp} />

            </Switch>
        </div>
    );
};

export default MainPage;
