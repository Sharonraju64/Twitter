const express = require('express');
const router = express.Router();
const Post = require('../model/post');

router.get('/getpost', async(req, res) =>{
    try {
        const post = (await Post.find({})).reverse();
        res.send(post);
    } catch (error) {
        return res.status(404).json({message: error});
    }
});

router.get('/userpost', async(req, res) =>{
    try {
        const email = req.query.email;
        const post = (await Post.find({email: email})).reverse();
        res.send(post);
    } catch (error) {
        return res.status(404).json({message: error});
    }
});

router.post('/post', async(req, res) =>{
    const post = req.body;
    try {
        const newPost = new Post({
            post: post.post,
            photo: post.photo,
            profileImage: post.profileImage,
            username: post.username,
            name: post.name,
            email: post.email
        });
        await newPost.save();
        //res.send('Post Added Successfully');
    } catch (error) {
        return res.status(404).json({message: error});
    }
});

module.exports = router;