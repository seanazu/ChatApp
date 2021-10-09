import React, {  useEffect, useState } from 'react';
import {Link } from 'react-router-dom';
import axios from 'axios'
import history from '../history';
import './LoginComp.css'



const LoginComp = () => {
    const [user , setUser] = useState({
        username : "",
        password : ""
    })
    useEffect(()=>{
        sessionStorage.removeItem('id')
    },[])

    const CheckData = async() =>{
        let users = await axios.get("http://localhost:7000/users")
        let usersArr = users.data
        let userData = usersArr.filter(item =>item.username == user.username
             && item.password == user.password )
        console.log(userData[0])
        if(userData[0] && user.password ){
            history.push(`/mainpage/${userData[0]._id}`)
            sessionStorage.setItem('id',userData[0]._id )
        }else{
        alert('User Data Incorrect')}

    }
    

    return (
        <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>

             
             <h2 className="login-header">Log in</h2>
           
             <div className="login-container" >
               <p><input type="text" placeholder="Username" onChange={(e)=> setUser({...user , username:e.target.value})}/></p>
               <p><input type="password" placeholder="Password" onChange={(e)=> setUser({...user , password:e.target.value})}/></p>
                Dont Have An Account ? <Link to="/signUpComp">Sign Up</Link><br/>
               <p><input type="button" value="Log in" onClick={CheckData}/></p>
               <div class='bold-line'></div>
            <div class='container'>
              <div class='window'>
                <div class='overlay'></div>
                <div class='content'>
                  <div class='welcome'>Hello There!</div>
                  <div class='subtitle'>We're almost done. Before using our services you need to create an account.</div>
                  <div class='input-fields'>
                    <input type='text' placeholder='Username' class='input-line full-width' onChange={(e)=> setUser({...user , username:e.target.value})}></input>
                    <input type='password' placeholder='Password' class='input-line full-width' onChange={(e)=> setUser({...user , password:e.target.value})}></input>
            
                  </div>
                  <div class='spacing'>or continue with <span class='highlight'>Facebook</span></div>
                  <div><button class='ghost-round full-width'>Create Account</button></div>
                </div>
              </div>
            </div>
            </div>
             
       </div>
    );
};

export default LoginComp;
