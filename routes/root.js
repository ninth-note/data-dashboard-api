const express = require('express')
const router = express.Router()
const path = require('path')


// serves the 'index.html' file in views folder as the response to the requests to the root directory or the endpoints /index.html, /index. This acts as the home page of the API
router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

module.exports = router