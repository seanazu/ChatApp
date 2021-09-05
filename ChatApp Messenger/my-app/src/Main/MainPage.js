import React, { useEffect } from 'react';
import {Switch, Route, Link } from 'react-router-dom';
import UsersComp from '../Users/UsersComp'
import './MainComp.css'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import history from '../history';
import GroupsComp from '../Groups/GroupsComp';
import ChatBoxComp from '../Private Chats/ChatBoxComp'
import UserInfoComp from '../User Info/UserInfoComp';
import CreateGroupComp from '../Groups/CreateGroupComp';
import GroupChatComp from '../Groups/GroupChatComp';




const MainPage = (props) => {
  const [value, setValue] = React.useState(2);

  useEffect(()=>{
   let id = props.match.params.id
   if(id == false){
     history.push('/')
   }
    
  },[])


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    return (
        <div >
            <br/>
            <br/>
            <br/>
            <br/>
            <span style={{display:'flex',justifyContent:'flex-end'}}> 
            <Button style={{display:'flex',justifyContent:'flex-end'}} variant="contained" color="primary" onClick={()=>history.push('/')} >Log Out</Button>
            </span>
            <br/>
            <br/> 
              <Paper square style={{margin:'auto' , width:'640px'}}>
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
                <Route path= "/mainpage/chatBoxComp/:room/:userId/:username" component={ChatBoxComp} />
                <Route path= "/mainpage/userInfo" component={UserInfoComp} />

            </Switch>
        </div>
    );
};

export default MainPage;
