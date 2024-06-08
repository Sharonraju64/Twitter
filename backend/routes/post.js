const express = require('express');
const router = express.Router();
const Post = require('../model/post');

router.get('/getpost', async(req, res) =>{
    try {
        const post = await Post.find().toArray();
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
            photo: post.photo
        });
        await newPost.save();
        //res.send('Post Added Successfully');
    } catch (error) {
        return res.status(404).json({message: error});
    }
});

module.exports = router;