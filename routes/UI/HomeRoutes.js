const express = require('express')
const { renderLoginPage, userLogin, renderRegisterPage, userRegister } = require('../../controllers/UI/AuthController')
const { handleHome } = require('../../controllers/UI/homeController')
const homeRoutes = express.Router()

homeRoutes.get('/', handleHome)
homeRoutes.get('/login', renderLoginPage)
homeRoutes.get('/register', renderRegisterPage)

homeRoutes.post('/userlogin', userLogin)
homeRoutes.post('/userregister', userRegister)

module.exports = homeRoutes