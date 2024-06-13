import React from 'react';
import '../styles/page.css';
import MainPage from './mainpage';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase';

const Profile = () => {
    const [user]=useAuthState(auth);

    return (
        <div className='profilePage'>
            <MainPage user={user} />
        </div>
    );
};

export default Profile;