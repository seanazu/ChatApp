import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './UserInfoComp.css'

const UserInfoComp = () => {
    const[user,setUser] = useState({})
    useEffect(async()=>{
        let user = await axios.get("http://localhost:7000/users/"+ sessionStorage.getItem('id'))
        setUser(user.data)
    },[])
    
    return (
        <div >
              <div className="page-content page-container" id="page-content">
                <div className="padding">
                    <div className="row container d-flex justify-content-center">
                        <div className="col-xl-6 col-md-12">
                            <div className="card user-card-full">
                                <div className="row m-l-0 m-r-0">
                                    <div className="col-sm-4 bg-c-lite-green user-profile">
                                        <div className="card-block text-center text-white">
                                            <div className="m-b-25"> <img src={user.image} className="img-radius" alt="User-Profile-Image"/> </div>
                                            <h6 className="f-w-600">{user.username}</h6>
                                            <p>{user.status}</p> <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                        </div>
                                    </div>
                                    <div className="col-sm-8">
                                        <div className="card-block">
                                            <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">City</p>
                                                    <h6 className="text-muted f-w-400">{user.city}</h6>
                                                </div>
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Age</p>
                                                    <h6 className="text-muted f-w-400">{user.age}</h6>
                                                </div>
                                            </div>
                                          
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  
};

export default UserInfoComp;
