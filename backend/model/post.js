const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        post: { type: String, required: true},
        photo: { type: String},
        profileImage: { type: String, required: true},
        username: { type: String, required: true},
        name: { type: String, required: true},
        email: { type: String, required: true}
    }
);

const postModel = mongoose.model('post', postSchema);

module.exports = postModel;