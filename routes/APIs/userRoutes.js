const express = require('express')
const { registerUser, loginUser, currentUser } = require('../../controllers/APIs/userContorller')
const validateToken = require('../../middleware/validateTokenHandler')
const User = require('../../models/userModel')
const userRoutes = express.Router()

userRoutes.get('/', async (req, res) => {
    const contact = await User.find(req.params.id)
    res.status(200).json(contact)
})
userRoutes.post('/register', registerUser)

userRoutes.post('/login', loginUser)

userRoutes.get('/current', validateToken, currentUser)


module.exports = userRoutes