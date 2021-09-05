import React, { useEffect } from 'react';
import { Switch,Route } from 'react-router-dom';
import LoginComp from '../Login/LoginComp';
import SignUpComponent from '../Login/SignUpComponent';
import MainPage from'./MainPage'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import PropTypes from 'prop-types';


function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({ target: window ? window() : undefined });
    
  
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }
  
  HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
  };


const MainComp = () => {
    
    return (
        <div>
             <React.Fragment>
              <CssBaseline />
              <HideOnScroll >
                <AppBar style={{height:'130px',backgroundColor:'skyblue'}}>
                  <Toolbar style={{display:'flex', justifyContent:'center'}}>
                  <img src="https://api.freelogodesign.org/files/463246c69261474caeb6025cc71ced07/thumb/logo_200x200.png?v=637617581860000000" alt="Subscription Web Site" />
                  </Toolbar>
                </AppBar>
              </HideOnScroll>
              <Toolbar />
            </React.Fragment>

            <Switch>
                <Route exact path='/' component={LoginComp} />
                <Route path='/signUpComp' component={SignUpComponent} />
                <Route path='/mainpage/:id' component={MainPage} />
            </Switch>

        </div>
    );
};

export default MainComp;
