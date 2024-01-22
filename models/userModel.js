const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: [true, 'Please add the User Name']
    },
    email: {
        type: String,
        require: [true, 'Please add Email Address'],
        unique: [true, 'Email Address is already taken']
    },
    password: {
        type: String,
        require: [true, 'Please add the user Password']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)