const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
        min: 3,
        max: 1000
    },
    email: {
        type: String,
        required: true,
        min: 3,
        max: 1000
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1000
    }
})

const User = mongoose.model('User', userSchema)

exports.User = User