const express = require('express');
const router = express.Router();
const User = require('../model/user');

router.get('/getuser', async(req, res) =>{
    try {
        const user = await User.find();
        res.send(user);
    } catch (error) {
        return res.status(404).json({message: error});
    }
});

router.get('/loggedinuser', async(req, res) =>{
    try {
        const email = req.query.email;
        const user = await User.find({email: email});
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

router.patch('/userUpdates/:email', async(req, res) =>{
    const filter = req.params;
    const profile = req.body;
    const options = { upsert: true};
    const updateDoc = {$set: profile};
    const result = await User.updateOne(filter, updateDoc, options)
    res.send(result);
});

module.exports = router;