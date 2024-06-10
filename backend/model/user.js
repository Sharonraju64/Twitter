const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true},
        name: { type: String, required: true},
        email: { type: String, required: true}
    }
);

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;