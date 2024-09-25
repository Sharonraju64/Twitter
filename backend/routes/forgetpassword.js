const express = require('express');
const router = express.Router();
const { generateOTP, generatePassword, transporter } = require('../Connection/genetate');
const updatePassword = require('../Connection/firebaseAdmin');

let otp = '';
let lastRequestTime = '';

// if(typeof window !== 'undefined'){
//     lastRequestTime = localStorage.getItem("lastRequestTime");
// };


router.post('/password-reset', (req, res) =>{
    const email = req.body.email;
    const now = new Date();
    if(lastRequestTime && (now - lastRequestTime) / (1000 * 60 * 60 *24) < 1){
        return res.status(429).send('You can Only request a password reset once a day');
    }
    otp = generateOTP();
    console.log(otp);
    // if(typeof window !== 'undefined'){
    //     localStorage.setItem("lastRequestTime", now);
    // }; 
    lastRequestTime = now;
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Your OTP code for Passwprd Reset',
        text: `Tour OTP code is ${otp}`
    };
    
    transporter.sendMail(mailOptions, (error, info) =>{
        if(error){
            return res.status(500).send(error.toString());
        }
        res.status(200).send(`OTP sent to ${email}`);
    });   
});

router.post('/verifyforgetpasswordotp', (req, res) =>{
    const email = req.body.email;
    if(req.body.otp === otp){
        const newPassword = generatePassword();
        updatePassword(email, newPassword)
        console.log(newPassword);

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: 'Your New Password for Twitter Application',
            text: `Your Password is ${newPassword}`
        };
        
        transporter.sendMail(mailOptions, (error, info) =>{
            if(error){
                return res.status(500).send(error.toString());
            }
            res.status(200).send(`OTP Verified. Your new password sent to ${email}.`);
        });
        // res.send(`OTP Verified. Your new password sent to ${email}.`);
    }else{
        res.status(400).send('Invalid OTP');
    }
});

module.exports = router;