const express = require('express')
const dotenv = require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000
const connectDB = require('./config/dbConnection')
const contactRoutes = require('./routes/contactRoutes')
const userRoutes = require('./routes/userRoutes')
const homeRoutes = require('./routes/HomeRoutes')
const { errorHandler } = require('./middleware/errorhandler')

connectDB();
app.use(express.json())
app.set('view engine', 'ejs')
app.use('/', homeRoutes)
// app.use(express.urlencoded({ extended: false}))
app.use('/api/contacts', contactRoutes)
app.use('/api/users', userRoutes)
app.use(errorHandler)


app.listen(port, () => {
    console.log(`Your local server working on http://localhost:${port}`);
})
