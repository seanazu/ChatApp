import axios from 'axios';
import React, { useState } from 'react';
import history from '../history';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
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
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

const SignUpComponent =  () => {
  const classes = useStyles();
  const[user, setUser]=useState({
            username: "" ,
            password : "" ,
            age :"",
            city :"",
            status : "",
            image : ""
        })

        const createNewUser = async()=>{
            if(user.username && user.password && user.age&& user.city&& user.status&& user.image ){
            let newUser = user
            const resp = await axios.post('http://localhost:7000/users',newUser )
            if(resp.data){
                alert(resp.data)
                history.push('/')
            }else{
                alert("Error Occurred")
            }
            } else{
                alert("Verify That Every Box Has Data")
            }
        }
        const cancelSignUp = () =>{
            history.push('/')
        }


    return (
        <div>

            <Container component="main" maxWidth="xs">
         <CssBaseline />
         <div className={classes.paper}>
           <Avatar className={classes.avatar}>
             <LockOutlinedIcon />
           </Avatar>
           <Typography component="h1" variant="h5">
             Sign Up
           </Typography>
           <form className={classes.form} noValidate>
             <TextField
               variant="outlined"
               margin="normal"
               required
               fullWidth
               id="username"
               label="username"
               name="username"
               autoComplete="username"
               onChange={(e) => setUser({...user , username : e.target.value})}
               autoFocus
             />
             <TextField
               variant="outlined"
               margin="normal"
               required
               fullWidth
               label="Password"
               onChange={(e) => setUser({...user , password : e.target.value})}
               autoComplete="current-password"
             />
             <TextField
               variant="outlined"
               margin="normal"
               required
               fullWidth
               label="age"
               onChange={(e) => setUser({...user , age : e.target.value})}
             />
             <TextField
               variant="outlined"
               margin="normal"
               required
               fullWidth
               label="city"
               onChange={(e) => setUser({...user , city : e.target.value})}
               autoComplete="current-password"
             />
             <TextField
               variant="outlined"
               margin="normal"
               required
               fullWidth
               label="status"
               onChange={(e) => setUser({...user , status : e.target.value})}
               autoComplete="current-password"
             />
             <TextField
               variant="outlined"
               margin="normal"
               required
               fullWidth
               label="image"
               onChange={(e) => setUser({...user , image : e.target.value})}
               autoComplete="current-password"
             />
             <Button
               type="button"
               fullWidth
               variant="contained"
               color="primary"
               className={classes.submit}
               onClick={createNewUser}
             >
               Sign Up
             </Button>
             <Button
               type="button"
               fullWidth
               variant="contained"
               color="primary"
               className={classes.submit}
               onClick={cancelSignUp}
             >
               Cancel
             </Button>
             <Grid container>
               <Grid item xs>
           
               </Grid>
             </Grid>
           </form>
         </div>
         <Box mt={8}>
         </Box>
       </Container>

        </div>
    );
};

export default SignUpComponent;
