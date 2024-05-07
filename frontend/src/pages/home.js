import React from 'react';
import { signOut } from 'firebase/auth';
import auth from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Sidebar from './sidebar';
import { Outlet } from 'react-router-dom';
import Widgets from './widgets';

const Home = () => {
    const user = useAuthState(auth);
    
    const handleLogout = () =>{
        signOut(auth)
    }
    return (
        <div className='app'>
            <Sidebar handleLogout={handleLogout} user={user}/>
            <Outlet />
            <Widgets />
        </div>
    );
};

export default Home;