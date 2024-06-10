const express = require('express');
const router = express.Router();
const User = require('../model/user');

router.get('/getuser', async(req, res) =>{
    try {
        const user = await User.find().toArray();
        res.send(user);
    } catch (error) {
        return res.status(404).json({message: error});
    }
});

router.post('/register', async(req, res) =>{
    const user = req.body;
    try {
        const newUser = new User({
            username: user.username,
            name: user.name,
            email: user.email
        });
        await newUser.save();
        //res.send('Post Added Successfully');
    } catch (error) {
        return res.status(404).json({message: error});
    }
});

module.exports = router;