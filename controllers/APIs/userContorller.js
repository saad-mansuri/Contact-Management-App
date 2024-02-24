const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../../models/userModel')

// @desc Register the new user
// @route GET /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        res.status(400)
        throw new Error('All fields ar mandatory!')
    }
    const userAvailable = await User.findOne({ email })
    if (userAvailable) {
        res.status(400)
        throw new Error('User already registered!')
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })
    console.log('user :', user);
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email })
    } else {
        res.status(400).json('User data not found')
    }
})

// @desc Login the user
// @route GET /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
    // console.log('req body login :', req.body);
    const { email, password } = req.body
    console.log(email, password);
    if (!email || !password) {
        json.status(400)
        throw new Error('All fields are mandotery!')
    }
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessWebToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
                // password: user.password,
            }
        }, process.env.ACCESS_TOKEN_SECRETKEY, { expiresIn: '10h' })
        res.status(200).json({ token: accessWebToken })
    } else {
        res.status(401)
        throw new Error('Email or Password is not valid')
    }
    // res.status(200).json('Logged in User')
})

// @desc Get the Current user information
// @route GET /api/users/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
    console.log('res :', req.user);
    res.status(200).json(req.user)
})


module.exports = {
    registerUser,
    loginUser,
    currentUser
}

