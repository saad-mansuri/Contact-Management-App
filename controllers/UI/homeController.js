const asyncHandler = require('express-async-handler')
const handleHome = asyncHandler((req, res) => {
    // console.log('res.body :', res.body)
    res.render('index', { title: 'My Home Page' })
    // res.render('index', { title: 'My Home Page' })
})

module.exports = {
    handleHome
}

