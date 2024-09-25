import React, { useEffect, useState } from "react";
import axios from "axios";
import twitterImage from '../../assets/twitter.jpeg';
import './forgetpassword.css';
import { useNavigate } from "react-router-dom";

const ForgetPassword = () =>{
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [message, setMessage] = useState('');
    const navigate =useNavigate();

    useEffect(()=>{
        if(otpSent){
            console.log(otpSent);            
        }        
    }, [otpSent]);

    const handleOtp = async(e) =>{
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/forgetpassword/password-reset', {email})
            .then(responce =>{
                setMessage(responce.data);
                setOtpSent(true);
            });
        } catch (err) {
            setMessage(err.response ? err.response.data : 'Error sending OTP');
        }
    };

    const handleVerify= async(e) =>{
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/forgetpassword/verifyforgetpasswordotp', {email, otp})
            .then(response =>{
                // setMessage(response.data);
                window.alert(response.data);
            })
            .catch(err =>{
                setMessage('Invalid OTP');
            });
            navigate('/');        
        } catch (err) {
            console.log("Error updating password:", err);            
            setMessage('Invalid OTP');
        }
    };

    return(
        <div className="forgetpassword-container">
            <div className="image-container">
                <img className="image" src={twitterImage} alt="" />
            </div>
            {!otpSent ? (
                <div className="form-container">
                    <div className="form-box">
                        <h3 className="heading1">Forget Password</h3>
                        {message && <h5>{message}</h5>}
                        <form onSubmit={handleOtp}>
                            <input 
                                type="email"
                                className="email"
                                placeholder="Enter Email"
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                            <div className="otp-btn">
                                <button type="submit" className="btn">Send OTP</button>
                            </div>
                        </form>
                    </div>
                </div>
            ):(
                <div className="form-container">
                    <div className="form-box">
                        <h3 className="heading1">OTP Verification</h3>
                        {message && <h5>{message}</h5>}
                        <form onSubmit={handleVerify}>
                            <input 
                                type="number"
                                className="otp"
                                placeholder="Enter Otp"
                                onChange={(e)=>setOtp(e.target.value)}
                            />
                            <div className="otp-sumbit">
                                <button type="submit" className="btn">Verify OTP</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}           
        </div>
    );
};

export default ForgetPassword;