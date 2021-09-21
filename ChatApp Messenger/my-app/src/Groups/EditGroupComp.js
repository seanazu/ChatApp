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
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  



const EditGroupComp = () => {
    const classes = useStyles();
    
    return (
        <div>
             <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <AddCircleOutlineIcon color='secondary' style={{fontSize:'xx-large'}}/>
              <Typography component="h1" variant="h5">
              Create Group
              </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      label="Group Name"
                      autoComplete="Full Name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      label="Status"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      label="Image"
                      autoComplete="current-password"
                      
                    />
                  </Grid>
                </Grid>
                <br/>
                <Typography>
                    Group Members: 

                </Typography>

                <br/>
                <Grid >
                  <Grid item>
                  <Button variant="contained" color="primary"  > Save</Button>{' '}
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

export default EditGroupComp;
