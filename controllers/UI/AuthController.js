const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../../models/userModel')
// const flash = require('connect-flash');

const renderLoginPage = asyncHandler((req, res) => {
    res.render('login.ejs')
})
const renderRegisterPage = asyncHandler((req, res) => {
    res.render('register.ejs',  {responseMessage :'Register page'})
})

const userRegister = asyncHandler(async(req, res) => {
    const { username, email, password } = req.body
    console.log('username :', username + email + password);
    if(!username || !email || !password){
        console.log('All fields are required!');
        return res.redirect('/register')
    }
    const checkUserAvailable = await User.findOne({email})
    if(checkUserAvailable){
        console.log('User is already registerd')
        return res.redirect('/register')
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const userCreated = await User.create({
        username,
        email,
        password:hashedPassword
    })
    console.log('userCreated :', userCreated);
    if(userCreated){
        return res.redirect('/login')
    }
})

const userLogin = asyncHandler(async (req, res) => {
    console.log('req login :', req.body);
    const { email, password } = req.body
    console.log('email :', email);
    console.log('password :', password);
    if (!email || !password) {
        console.log('please enter value');
        // req.flash('error', 'All fields are required')
        return res.redirect('/login')
    }
    const user = await User.findOne({ email })
    console.log('user :', user);
    // return
    let accessWebToken;
    if (user && (await bcrypt.compare(password, user.password))) {
        accessWebToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
                // password: user.password,
            }
        }, process.env.ACCESS_TOKEN_SECRETKEY, { expiresIn: '10h' })
        console.log('auth-token :', accessWebToken);
        if(accessWebToken){
            return res.redirect('/')
        }
        // res.status(200).json({ token: accessWebToken })
    } else {
        console.log('Email or Password is not valid');
        return res.redirect('/login')
    }
    console.log('auth-token :', accessWebToken);
    // if (email == '' && password == '') {
    //     return res.redirect('/login')
    // }
    // return res.redirect('/')
    // res.render('index', { title: 'My Home Page' })
})

module.exports = {
    renderLoginPage,
    renderRegisterPage,
    userLogin,
    userRegister
}

