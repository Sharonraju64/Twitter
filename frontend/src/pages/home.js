import React from 'react';
import { signOut } from 'firebase/auth';
import auth from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Sidebar from './sidebar';
import Feed from './feed';
import Widgets from './widgets';

const Home = () => {
    const user = useAuthState(auth);
    
    const handleLogout = () =>{
        signOut(auth)
    }
    return (
        <div className='app'>
            <Sidebar handleLogout={handleLogout} user={user}/>
            <Feed />
            <Widgets />
        </div>
    );
};

export default Home;