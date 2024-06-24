import React from 'react';
import { useUserAuth } from '../Firebase/UserAuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const { user } = useUserAuth();

    if(!user){
        return <Navigate to='/login' />
    }
    return children;
};

export default ProtectedRoute;