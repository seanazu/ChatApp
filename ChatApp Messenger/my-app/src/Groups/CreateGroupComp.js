import React, { useEffect, useState , useRef} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import axios from 'axios';
import { Card, Checkbox } from '@material-ui/core';
import history from '../history';
import _uniqueId from 'lodash.uniqueid';



const useStyles1 = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const useStyles = makeStyles({
  root: {
    maxWidth: 450,
  },
  media: {
    height: 140,
  },
});
  

const CreateGroupComp = () => {
    const classes1 = useStyles1();
    const [id] = useState(_uniqueId('prefix-'))
    const classes = useStyles();
    const[users, setUsers] = useState([])
    const[numbers, setNumbers] = useState(0)
    const[group , setGroup] = useState({})
    

    useEffect(async ()=>{
        let users = await axios.get('http://localhost:7000/users')
        setUsers(users.data)
        let managerArray = []
        let managerObj = {
            userId : sessionStorage.getItem('id')
        }
        setId(id)
        managerArray.push(managerObj)
        setGroup({...group, managers:managerArray})
    },[])

    let usersObj = users.map((user,index) =>{
        return(
            <div key ={index}>
          <Card className={classes.root} style={{margin:'auto', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                <span style={{fontSize:'x-large'}} >{user.username} </span>: <Checkbox onChange = {(e) =>{
                      if(e.target.checked == true){
                          let userObj = {
                              userId : user._id,
                              username : user.username
                          }
                          let membersArray =  group.members
                          membersArray.push(userObj)
                          setGroup({...group, members :membersArray})
                          setNumbers(numbers + 2)
                          console.log("numbers == 2",numbers);
                      }
                  }}   />
                <br/>
          </Card>
          <br/>
          </div>
        )
    })

    const createGroup = async () =>{
        let groupObj = group
        let resp = await axios.post('http://localhost:7000/groups', groupObj)
        alert(resp.data)
        history.push('/mainpage/groupsComp')
    }

    return (
        <div>
              
           <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes1.paper}>
              <AddCircleOutlineIcon color='secondary' style={{fontSize:'xx-large'}}/>
              <Typography component="h1" variant="h5">
              Create Group
              </Typography>
              <form className={classes1.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      label="Group Name"
                      onChange={(e)=>setGroup({...group, name:e.target.value })}
                      autoComplete="Full Name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      label="Status"
                      onChange={(e)=>setGroup({...group, status:e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      label="Image"
                      autoComplete="current-password"
                      onChange={(e)=>setGroup({...group, image:e.target.value })}
                      
                    />
                  </Grid>
                </Grid>
                <br/>
                <Typography>
                    Group Members: 
                </Typography>
                {usersObj}
                <br/>
                <Grid >
                  <Grid item>
                  <Button variant="contained" color="primary" onClick={createGroup} > Save</Button>{' '}
                  <Button variant="contained" color="primary"  > Cancel</Button>
                  </Grid>
                </Grid>
              </form>
            </div>
            <Box mt={5}>
            </Box>
          </Container>
        </div>
    );
};

export default CreateGroupComp;
