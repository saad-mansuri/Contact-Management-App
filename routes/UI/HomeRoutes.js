const express = require('express')
const { renderLoginPage, userLogin, renderRegisterPage, userRegister } = require('../../controllers/UI/AuthController')
const { renderUsersPage, usersList } = require('../../controllers/UI/UserController')
const { handleHome } = require('../../controllers/UI/homeController')
const validateToken = require('../../middleware/validateTokenHandler')
const homeRoutes = express.Router()

homeRoutes.get('/', handleHome)
homeRoutes.get('/login', renderLoginPage)
homeRoutes.get('/register', renderRegisterPage)
homeRoutes.get('/users', renderUsersPage)

homeRoutes.post('/userlogin', userLogin)
homeRoutes.post('/userregister', userRegister)

homeRoutes.get('/userslist',validateToken, usersList)

module.exports = homeRoutes