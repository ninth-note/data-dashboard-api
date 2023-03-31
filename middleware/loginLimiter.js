const rateLimit = require('express-rate-limit')

// need a way to limit the number of logins per time frame, this achieves this
const loginLimiter = rateLimit({
    windowMs: 120 * 1000, // 2 minutes
    max: 5, // limit number of limit attempts to 5
    message:
        { message: 'Max login attempts used' }, // provide some message
    handler: (req, res, next, options) => {
        res.status(options.statusCode).send(options.message)
    },
})

module.exports = loginLimiter