const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        post: { type: String, required: true},
        photo: { type: String}
    }
);

const postModel = mongoose.model('post', postSchema);

module.exports = postModel;