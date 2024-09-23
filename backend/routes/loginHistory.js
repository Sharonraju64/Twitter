const express = require('express');
const router = express.Router();
const {generateOTP, transporter} = require('../Connection/genetate');
const loginHistory = require('../model/loginHistory');

let otps = {};

const isLoginAllowed = (device) =>{
    const now = new Date();
    const hours = now.getUTCHours() + 5.5; // Convert UTC to IST
    if (device == 'smartphone' && (hours < 10 || hours > 13)) {
        return false;
    }
    return true;
};

router.get('/getalllogins', async(req, res) =>{
    try {
        const login = (await loginHistory.find({})).reverse();
        res.send(login);
    } catch (error) {
        return res.status(404).json({message: error});
    }
});

router.get('/userlogin', async(req, res) =>{
    try {
        const email = req.query.email;
        const login = (await loginHistory.find({email: email})).reverse();
        res.send(login);
    } catch (error) {
        return res.status(404).json({message: error});
    }
});

router.post('/addlogin', async(req, res) =>{
    const login = req.body;
    try {
        const newLogin = new loginHistory({
            email: login.email,
            ipAddress: login.ipAddress,
            browser: login.browser,
            os: login.os,
            device: login.device,
            mobile: login.mobile,
        });
        await newLogin.save();
    } catch (error) {
        return res.status(404).json({message: error});
    }
});

router.post('/login', async(req, res)=>{
    const {email, browser, device } = req.body;

    if(!isLoginAllowed(device)){
        return res.status(403).send('Mobile access allowed only between 10 AM to 1 PM IST');
    };

    if(browser === 'Chrome'){
        const otp = generateOTP();
        console.log(otp);        
        otps[email] = otp;
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: 'Your OTP Code for Login',
            text: `Your OTP code is ${otp}.`,
        };

        transporter.sendMail(mailOptions, (error, info) =>{
            if(error) {
                return res.status(500).send(error.toString());
            }
            res.status(200).send(`OTP sent to ${email}`);
        });
    } else {
        res.status(200).send('Login Successfully!')
    }
});

router.post('/verifyloginotp', (req, res) =>{
    const { email, otp } = req.body;
    if(otps[email] && otps[email] === otp){
        res.status(200).send('OTP Verified. Login Successfully!');
    } else {
        res.status(400).send('Invalid OTP');
    }
});

module.exports = router;