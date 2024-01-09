const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        enum: ['shipper', 'carrier']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please use a valid email address']
    },
    password: {
        type: String,
        required: true
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
