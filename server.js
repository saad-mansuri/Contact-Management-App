const express = require('express')
const dotenv = require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000
const connectDB = require('./config/dbConnection')
// const session = require('express-session');
// const flash = require('connect-flash');
const contactRoutes = require('./routes/APIs/contactRoutes')
const userRoutes = require('./routes/APIs/userRoutes')
const homeRoutes = require('./routes/UI/HomeRoutes')
// const userAuthentication = require('./routes/UI/userAuthentication')
const { errorHandler } = require('./middleware/errorhandler')

connectDB();
app.use(express.json())
// app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
// app.use(session({
//     secret:'test',
//     resave:false,
//     saveUninitialized:false
// }))
app.use('/', homeRoutes)
// app.use(express.urlencoded({ extended: false}))
app.use('/api/contacts', contactRoutes)
app.use('/api/users', userRoutes)

// app.use('/auth', userAuthentication)
app.use(errorHandler)


app.listen(port, () => {
    console.log(`Your local server working on http://localhost:${port}`);
})
