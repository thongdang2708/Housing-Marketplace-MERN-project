
import React from 'react';
import { authStatus } from '../../hook/AuthStatus';
import Spinner from './Spinner';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const Private = () => {
    let {loggedIn, checkStatus} = authStatus();

    if (checkStatus) {
        return (<Spinner />)
    }

    return loggedIn ? <Outlet /> : <Navigate to="/login" />
    
};

export default Private