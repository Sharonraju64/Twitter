import React, { useEffect, useState } from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import auth from '../Firebase/firebase';

const useLoggedinUser = () => {
    const [user] = useAuthState(auth);
    const email = user?.email;
    const [loggedInUser, setLoggedInUser] = useState({});

    useEffect(() =>{
        fetch(`https://twitter-rfzi.onrender.com/api/user/loggedinuser?email=${email}`)
        .then(res=> res.json())
        .then(data=>{
            setLoggedInUser(data)
        })
    },[email, loggedInUser]);
    return [loggedInUser, setLoggedInUser];
};

export default useLoggedinUser;