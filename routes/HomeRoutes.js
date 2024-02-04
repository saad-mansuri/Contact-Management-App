const express = require('express')
const { handleHome } = require('../controllers/homeController')
const homeRoutes = express.Router()

homeRoutes.get('/', handleHome)

module.exports = homeRoutes