import React, { useState } from 'react';
import twitterImage from '../../assets/twitter.jpeg';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useUserAuth } from '../../Firebase/UserAuthContext';
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from 'react-google-button';
import './login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { logIn, googleSignIn } = useUserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError("");
        try {
            await logIn(email, password);
            navigate("/")
        } catch (err) {
            setError(err.message);
            window.alert(err.message);
        }
    };

    const handleGoogleSignin = async (e) =>{
        e.preventDefault();
        try {
            await googleSignIn();
            navigate('/')
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className='login-container'>
            <div className='image-container'>
                <img className='image' src={twitterImage} alt='' />
            </div>
            <div className='form-container'>
                <div className='form-box'>
                    <TwitterIcon style={{color: 'skyblue'}}/>
                    <h2 className='heading'>Happing now</h2>
                    <h3 className='heading1'>What happening today</h3>
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
                <hr/>
                    <div className='google-button'>
                        <GoogleButton 
                            className='g-btn'
                            type='light'
                            onClick={handleGoogleSignin}
                        />
                    </div>
                    <div>
                        Don't have account?
                        <Link 
                            to='/signup'
                            style={{
                                textDecoration:'none',
                                color:'skyblue',
                                fontWeight:'600',
                                marginLeft:'5px'
                            }}
                        >
                            Sign Up
                        </Link>
                    </div>
            </div>                    
        </div>
    );
};

export default Login;