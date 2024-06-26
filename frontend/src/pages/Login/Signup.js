import React, { useState } from 'react';
import twitterImage from '../../assets/twitter.jpeg';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useUserAuth } from '../../Firebase/UserAuthContext';
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from 'react-google-button';
import axios from 'axios';
import './login.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const { signUp, googleSignIn } = useUserAuth();
    const navigate = useNavigate();
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError("");
        try {
            await signUp(email, password);
            const user = {
                username : username,
                name : name,
                email : email,
            }

            axios.post('https://twitter-rfzi.onrender.com/api/user/register', user);
            navigate('/');
        } catch (error) {
            setError(error.message);
            window.alert(error.message);
        }
    };

    const handleGoogleSignin = async (e) =>{
        e.preventDefault();
        try {
            await googleSignIn();
            navigate("/");
        } catch (error) {
            console.log(error.message);
            console.log(error);
        }
    };

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
                    {error && <p className='errorMessage'>{error}</p>}
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
                                color:'var(--twitter-color)',
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