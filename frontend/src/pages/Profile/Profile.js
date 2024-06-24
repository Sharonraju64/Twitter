import React from 'react';
import '../page.css';
import MainProfile from './MainProfile/MainProfile';
import { useUserAuth } from '../../Firebase/UserAuthContext';

const Profile = () => {
    const { user }=useUserAuth();

    return (
        <div className='profilePage'>
            <MainProfile user={user} />
        </div>
    );
};

export default Profile;