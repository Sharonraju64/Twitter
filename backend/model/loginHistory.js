const mongoose = require('mongoose');

const loginHistorySchema = new mongoose.Schema(
    {
        email: {type: String, required: true},
        ipAddress: {type: String, required: true},
        browser: {type: String, required: true},
        os: {type: String, required: true},
        device: {type: String, required: true},
        mobile: {type: String, default: null}
    },
    { timestamps: true}
);

const loginHistoryModel = mongoose.model('loginHistory', loginHistorySchema);

module.exports = loginHistoryModel;