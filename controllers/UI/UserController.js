const asyncHandler = require('express-async-handler')
// const jwt = require('jsonwebtoken')
const Contact = require('../../models/contactModel')

const renderUsersPage = asyncHandler(async(req,res) =>{
    res.render('users.ejs')
    console.log('req from renderUsersPage :', req)
})

const usersList = asyncHandler(async(req,res) =>{
    // console.log('req from userlist :', req)
})

module.exports = {
    renderUsersPage,
    usersList
}