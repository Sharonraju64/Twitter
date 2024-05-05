import React, { useState } from 'react';
import twitterImage from '../assets/twitter.jpeg';
import TwitterIcon from '@mui/icons-material/Twitter';
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth';
import auth from "../firebase";

const Signup = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    
    if (user) {
        console.log(user);
    }

    if (error) {
        console.log(error.message);
    }

    if (loading) {
        console.log('loading...');
    }

    const handleSubmit = e =>{
        e.preventDefault();
        console.log(email, password);
        createUserWithEmailAndPassword(email, password);
    }

    return (
        <div className='signup-container'>
            <div className='image-container'>
                <img src={twitterImage} alt='' />
            </div>
            <div className='form-container'>
                <TwitterIcon />
                <h2>Happing now</h2>
                <form onSubmit={handleSubmit}>
                    <input
                    type='text'
                    className='display-name'
                    placeholder='Username'
                    onChange={(e)=>setUsername(e.target.value)}
                    />
                    <input 
                    className='display-name'
                    placeholder='Enter Full Name'
                    onChange={(e)=>setName(e.target.value)}
                    />
                    <input 
                        type='email'
                        className='email'
                        placeholder='Email Address'
                        onChange={(e)=>setEmail(e.target.value)} 
                    />

                    <input 
                        type='password' 
                        className='password'
                        placeholder='Password'
                        onChange={(e)=>setPassword(e.target.value)} 
                    />
                    
                    <div className='btn-login'>
                        <button type='submit' className='btn'>Sign Up</button>
                    </div>
                </form>
            </div>                    
        </div>
    );
};

export default Signup;