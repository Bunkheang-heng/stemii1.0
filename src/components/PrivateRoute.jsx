import React from 'react'
import { Outlet, Navigate } from 'react-router';
import {UserAuthStatus} from '../hooks/userAuthStatus';

export default function PrivateRoute() {
    const {loggedIn, checkingStatus} = UserAuthStatus(); 

    if(checkingStatus){
        return (
           <h3>Loading...</h3>
        )
    }
  return loggedIn ? <Outlet/> : <Navigate to="/login/" />;
}