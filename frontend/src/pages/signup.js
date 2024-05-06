import React, { useState } from 'react';
import twitterImage from '../assets/twitter.jpeg';
import TwitterIcon from '@mui/icons-material/Twitter';
import {useCreateUserWithEmailAndPassword, useSignInWithGoogle} from 'react-firebase-hooks/auth';
import auth from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from 'react-google-button';
import '../styles/login.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    
    if (user || googleUser) {
        navigate('/')
        console.log(user);
        console.log(googleUser);
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
    const handleGoogleSignin = () =>{
        signInWithGoogle();
    }

    return (
        <div className='login-container'>
            <div className='image-container'>
                <img className='image' src={twitterImage} alt='' />
            </div>
            <div className='form-container'>
                <div className='form-box'>
                    <TwitterIcon className='twittericon' style={{color: 'skyblue'}} />
                    <h2 className='heading'>Happing now</h2>
                    <h3 className='heading1'>Join twitter today</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                        type='text'
                        className='display-name'
                        placeholder='@username'
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
                    <hr/>
                    <div className='google-button'>
                        <GoogleButton 
                            className='g-btn'
                            type='light'
                            onClick={handleGoogleSignin}
                        />
                    </div>
                    <div>
                        Already have an account?
                        <Link 
                            to='/login'
                            style={{
                                textDecoration:'none',
                                color:'skyblue',
                                fontWeight:'600',
                                marginLeft:'5px'
                            }}
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>                    
        </div>
    );
};

export default Signup;