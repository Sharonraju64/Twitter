import React, { useState } from 'react';
import twitterImage from '../assets/twitter.jpeg';
import TwitterIcon from '@mui/icons-material/Twitter';
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth';
import auth from "../firebase";
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
      
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
        signInWithEmailAndPassword(email, password);
    }

    return (
        <div className='login-container'>
            <div className='image-container'>
                <img src={twitterImage} alt='' />
            </div>
            <div className='form-container'>
                <TwitterIcon />
                <h2>Happing now</h2>
                <form onSubmit={handleSubmit}>
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
                        <button type='submit' className='btn'>Login</button>
                    </div>
                </form>
            </div>                    
        </div>
    );
};

export default Login;