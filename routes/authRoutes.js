const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const loginLimiter = require('../middleware/loginLimiter')


// set up route handler for post request (login) and specify the login limiter
router.route('/')
    .post(loginLimiter, authController.login)

// set up route handler for get request (refresh)
router.route('/refresh')
    .get(authController.refresh)

// set up route handler for post request (logout)
router.route('/logout')
    .post(authController.logout)

module.exports = router