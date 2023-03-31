const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// @desc Login
// @route POST /auth
// @access Public
const login = async (req, res) => {

    // destruct body and assign
    const { username, password } = req.body

    // check if both are provided
    if (!username || !password) {
        return res.status(400).json({ message: 'All fields required' })
    }

    // find the user by name
    const user = await User.findOne({ username }).exec()

    // if no such user return status 401
    if (!user) {
        return res.status(401).json({ message: 'Login Failed' })
    }

    // compare the hashed password in db and the provided password through login
    const match = await bcrypt.compare(password, user.password)

    // if the password does not match return status 401
    if (!match) return res.status(401).json({ message: 'Login Failed' })

    // if above are successfull create an access token and refresh token, first expires after 1 hr the second after 1 day
    const accessToken = jwt.sign(
        {
            // the cookie holds the id, username and role
            "Profile": {
                "id": user._id,
                "username": user.username,
                "role": user.role
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '60m' }
    )

    const refreshToken = jwt.sign(
        { "username": user.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '24h' }
    )

    // Create secure cookie with refresh token 
    res.cookie('jwt', refreshToken, {
        httpOnly: true, // accessible only by web server 
        secure: true, // meaning https used
        sameSite: 'None', // cross-site cookie (not secure)
        maxAge: 24 * 60 * 60 * 1000 // cookie expiry: 1 day
    })

    // Respond with an access token containing id, username and roles 
    res.json({ accessToken })
}

// @desc Refresh
// @route GET /auth/refresh
// @access Public - when a access token has expired refresh to get another one
const refresh = (req, res) => {
    const cookies = req.cookies

    // if no jwt property is found return unauthorized
    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

    // first the jwt is extracted and assigned a constant value that will be used throughout the next step
    const refreshToken = cookies.jwt

    // now the jwt.verify method validates the refreshToken against the .env envrionmental variable, if valid a new access token is generated and returned containing id, username and role
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden: ' + err })

            const user = await User.findOne({ username: decoded.username }).exec()

            if (!user) return res.status(401).json({ message: 'Unauthorized' })

            const accessToken = jwt.sign(
                {
                    "Profile": {
                        "id": user._id,
                        "username": user.username,
                        "role": user.role
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10m' }
            )

            res.json({ accessToken })
        }
    )
}

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) // If no jwt property was found return a 204
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
}

module.exports = {
    login,
    refresh,
    logout
}