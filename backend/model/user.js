const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true},
        name: { type: String, required: true},
        email: { type: String, required: true},
        profileImage: {type: String, default: ''},
        coverImage: {type: String, default: ''},
        bio: {type: String, default: ''},
        location: {type: String, default: ''},
        website: {type: String, default: ''}
    }
);

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;