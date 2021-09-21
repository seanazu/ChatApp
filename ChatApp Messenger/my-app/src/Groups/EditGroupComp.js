import React from 'react';


const EditGroupComp = () => {
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
