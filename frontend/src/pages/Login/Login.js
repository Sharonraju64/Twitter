import React, { useEffect, useState } from 'react';
import axios from 'axios';
import twitterImage from '../../assets/twitter.jpeg';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useUserAuth } from '../../Firebase/UserAuthContext';
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from 'react-google-button';
import MobileDetect from 'mobile-detect';
import './login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ipAddress, setIpAddress] = useState('');
    const [browser, setBrowser] = useState('');
    const [os, setOs] = useState('');
    const [device, setDevice] = useState('');
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [error, setError] = useState('');
    const { logIn, googleSignIn, user } = useUserAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        if(ipAddress && browser && os && device){
            const data = {
              email: email,
              ipAddress: ipAddress,
              browser: browser,
              os: os,
              device: device,
              mobile: mobile
            };
            console.log(email, ipAddress, browser, os, device, mobile);
            axios.post('http://localhost:5000/api/login/login', data)
            .then(response => {
              setMessage(response.data);
              if (browser === 'Chrome') {
                setOtpSent(true);
              }
              else{
                navigate('/');
              }
            })
            .catch(err =>{
              setMessage(err.response ? err.response.data : 'Error occurred');
            });
            axios.post('http://localhost:5000/api/login/addlogin', data)
            .then(response =>{
                setMessage(response.data);
            })
            .catch(err =>{
                setMessage(err.response ? err.response.data : 'Error occurred');
            });
        }
    }, [email, ipAddress, browser, os, device, mobile, navigate]);

    const getData = async(e) =>{
        const ipres = await axios.get('https://api.ipify.org');
        setIpAddress(ipres.data);
        const browserres = await axios.get(`https://api.apicagent.com/?ua=${window.navigator.userAgent}`);   
        setBrowser(browserres.data.client.name);    
        setOs(browserres.data.os.name); 
        setDevice(browserres.data.device.type);
        const detector = new MobileDetect(window.navigator.userAgent);      
        setMobile(detector.mobile());
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError("");
        try {
            await logIn(email, password);
            getData();
        } catch (err) {
            setError(err.message);
            window.alert(err.message);
        }
    };

    const handleGoogleSignin = async (e) =>{
        e.preventDefault();
        try {
            await googleSignIn();
            getData();
            setEmail(user?.email);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleVerify = async (e) =>{
        e.preventDefault();
        try {           
            axios.post('http://localhost:5000/api/login/verifyloginotp', {email, otp})
                .then(response =>{
                    setMessage(response.data);
                    navigate('/');
                })
                .catch(err =>{
                    setMessage(err.response ? err.response.data : 'Error occurred');
                });
        } catch (err) {
            setMessage(err.response.data);
        }
    };

    return (
        <div className='login-container'>
            <div className='image-container'>
                <img className='image' src={twitterImage} alt='' />
            </div>
            {!otpSent ? (
                <div className='form-container'>
                    <div className='form-box'>
                        <TwitterIcon style={{color: 'skyblue'}}/>
                        <h2 className='heading'>Happening Now</h2>
                        <h3 className='heading1'>What Happening Today</h3>
                        {message && <h5>{message}</h5>}
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
            ):(
                <div className='form-container'>
                    <div className='form-box'>
                        <h3 className='heading1'>OTP Verification</h3>
                        {message && <h5>{message}</h5>}
                        <form onSubmit={handleVerify}>
                            <input 
                                type='otp' 
                                className='otp'
                                placeholder='Enter Otp'
                                onChange={(e)=>setOtp(e.target.value)} 
                            />  

                            <div className='otp-submit'>
                                <button type='submit' className='btn'>Verify OTP</button>
                            </div> 
                        </form>
                    </div>
                </div> 
            )}                      
        </div>
    );
};

export default Login;